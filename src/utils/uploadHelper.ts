import {
  UploadType,
  UploadResponse,
  PresignedUrlPart,
} from "@/types/file-upload";
import { Response } from "@/types/http";

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  onStatusChange?: (status: string) => void;
}

export function getUploadType(file: File): UploadType {
  if (file.type.startsWith("video/")) {
    return "VIDEO";
  }
  if (file.type.startsWith("image/")) {
    return "IMAGE";
  }
  return "DOCUMENT";
}

export interface UploadedPart {
  part_number: number;
  etag: string;
}

async function uploadToPresignedUrl(
  url: string,
  data: Blob,
  headers: Record<string, string> = {},
): Promise<void> {
  const response = await fetch(url, {
    method: "PUT",
    body: data,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Upload failed:", response.status, errorText);
    throw new Error(`Upload failed with status ${response.status}`);
  }
}

async function uploadSinglePart(
  file: File,
  presignedUrl: string,
  options?: UploadOptions,
  headers?: Record<string, string>,
): Promise<void> {
  options?.onStatusChange?.("Uploading file...");

  await uploadToPresignedUrl(presignedUrl, file, headers);

  options?.onProgress?.({
    loaded: file.size,
    total: file.size,
    percentage: 100,
  });
}

async function uploadMultipart(
  file: File,
  partSize: number,
  parts: PresignedUrlPart[],
  options?: UploadOptions,
  headers?: Record<string, string>,
): Promise<void> {
  const totalParts = parts.length;
  let uploadedBytes = 0;

  options?.onStatusChange?.(`Uploading file in ${totalParts} parts...`);

  const sortedParts = [...parts].sort((a, b) => a.part_number - b.part_number);

  for (let i = 0; i < totalParts; i++) {
    const start = i * partSize;
    const end = Math.min(start + partSize, file.size);
    const chunk = file.slice(start, end);
    const part = sortedParts[i];

    options?.onStatusChange?.(`Uploading part ${i + 1} of ${totalParts}...`);

    await uploadToPresignedUrl(part.url, chunk, headers);

    uploadedBytes += chunk.size;
    options?.onProgress?.({
      loaded: uploadedBytes,
      total: file.size,
      percentage: Math.round((uploadedBytes / file.size) * 100),
    });
  }
}

export interface UploadApiFunctions {
  createSession: (payload: {
    upload_type: UploadType;
    file_name: string;
    file_size: number;
    content_type: string;
  }) => Promise<Response<UploadResponse>>;
  fetchParts: (
    uploadSessionId: string,
  ) => Promise<Response<{ parts: UploadedPart[] }>>;
  complete: (
    uploadSessionId: string,
    parts: UploadedPart[],
  ) => Promise<unknown>;
}

export async function uploadFile(
  file: File,
  api: UploadApiFunctions,
  options?: UploadOptions,
): Promise<string> {
  const uploadType = getUploadType(file);

  options?.onStatusChange?.("Creating upload session...");

  const sessionResponse = await api.createSession({
    upload_type: uploadType,
    file_name: file.name,
    file_size: file.size,
    content_type: file.type,
  });

  if (!sessionResponse?.data) {
    console.error("Invalid session response:", sessionResponse);
    throw new Error("Failed to create upload session - invalid response");
  }

  const {
    upload_session_id,
    presigned_url,
    presigned_urls,
    is_multipart,
    part_size,
    required_headers,
  } = sessionResponse.data;

  if (!upload_session_id) {
    throw new Error("Failed to create upload session - missing session ID");
  }

  if (is_multipart && presigned_urls && presigned_urls.length > 0) {
    options?.onStatusChange?.("Starting multipart upload...");
    await uploadMultipart(file, part_size, presigned_urls, options, required_headers);

    options?.onStatusChange?.("Fetching upload parts...");
    const partsResponse = await api.fetchParts(upload_session_id);

    if (!partsResponse?.data?.parts) {
      console.error("Invalid parts response:", partsResponse);
      throw new Error("Failed to fetch upload parts");
    }

    const uploadedParts = partsResponse.data.parts;

    options?.onStatusChange?.("Finalizing upload...");

    await api.complete(upload_session_id, uploadedParts);
  } else if (presigned_url) {
    await uploadSinglePart(file, presigned_url, options, required_headers);

    options?.onStatusChange?.("Finalizing upload...");
    await api.complete(upload_session_id, []);
  } else {
    throw new Error("No presigned URL available for upload");
  }

  options?.onStatusChange?.("Upload complete!");

  return upload_session_id;
}

export function isValidUUID(str: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// ─── Video URL helpers ────────────────────────────────────────────────────────

const VIDEO_URL_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v", ".mkv", ".avi"];

function isDirectVideoUrl(url: string): boolean {
  const lower = url.toLowerCase().split("?")[0];
  return VIDEO_URL_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
  } catch {
    // not a valid URL
  }
  return null;
}

/**
 * Attempts to resolve the duration (in whole seconds) of a video from its URL.
 *
 * Strategies:
 *  1. Direct video file → hidden <video> element + loadedmetadata
 *  2. YouTube            → YouTube oEmbed (returns duration via the Data API is
 *                          unavailable without a key; we fall back to null)
 *  3. Vimeo              → Vimeo oEmbed (public endpoint, returns duration)
 *  4. Anything else      → returns null
 *
 * Always resolves (never rejects). Returns null when duration cannot be inferred.
 */
export async function inferVideoDurationFromUrl(url: string): Promise<number | null> {
  if (!url || typeof window === "undefined") return null;

  try {
    // ── 1. Direct video file ───────────────────────────────────────────────
    if (isDirectVideoUrl(url)) {
      // Helper that attempts to load metadata for a given URL.
      // skipCors=true omits crossOrigin so CDN URLs without CORS headers still work.
      const tryLoad = (skipCors: boolean) =>
        new Promise<number | null>((resolve) => {
          const video = document.createElement("video");
          video.preload = "metadata";
          if (!skipCors) video.crossOrigin = "anonymous";

          const cleanup = () => {
            video.onloadedmetadata = null;
            video.onerror = null;
            video.src = "";
            video.load(); // abort pending network request
            video.remove();
          };

          const timer = setTimeout(() => {
            cleanup();
            resolve(null);
          }, 15000);

          video.onloadedmetadata = () => {
            clearTimeout(timer);
            const dur = Math.round(video.duration);
            cleanup();
            resolve(isFinite(dur) && dur > 0 ? dur : null);
          };

          video.onerror = () => {
            clearTimeout(timer);
            cleanup();
            resolve(null);
          };

          video.src = url;
          video.load();
        });

      // First attempt: no crossOrigin (works for CDN URLs without CORS headers)
      const result = await tryLoad(true);
      if (result !== null) return result;

      // Second attempt: with crossOrigin=anonymous (works for CORS-enabled sources)
      return await tryLoad(false);
    }

    // ── 2. Vimeo oEmbed (free, no auth needed) ─────────────────────────────
    if (url.includes("vimeo.com")) {
      try {
        const oembed = await fetch(
          `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`,
          { signal: AbortSignal.timeout(6000) },
        ).then((r) => r.json());
        const dur = oembed?.duration;
        return typeof dur === "number" && dur > 0 ? Math.round(dur) : null;
      } catch {
        return null;
      }
    }

    // ── 3. YouTube — duration requires Data API v3 key which we don't have.
    //       We record the video ID in a comment so future integration is easy,
    //       but return null for now.
    const ytId = extractYouTubeId(url);
    if (ytId) {
      // TODO: if a YouTube Data API v3 key is configured, fetch duration here.
      // e.g. https://www.googleapis.com/youtube/v3/videos?id=${ytId}&part=contentDetails&key=KEY
      return null;
    }

    return null;
  } catch {
    return null;
  }
}
