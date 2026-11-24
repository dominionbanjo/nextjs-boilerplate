export type UploadType = "VIDEO" | "DOCUMENT" | "IMAGE";

export interface UploadPayload {
  upload_type: UploadType;
  file_name: string;
  file_size: number;
  content_type: string;
}

export interface PresignedUrlPart {
  part_number: number;
  url: string;
}

export interface UploadResponse {
  upload_session_id: string;
  upload_id: string | null;
  part_size: number;
  total_parts: number;
  expires_in: number;
  is_multipart: boolean;
  presigned_url: string | null;
  presigned_urls: PresignedUrlPart[] | null;
  required_headers?: Record<string, string>;
}
