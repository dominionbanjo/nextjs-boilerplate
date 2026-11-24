export async function compressImage(
  file: File,
  options?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number; // 0 - 1
  },
): Promise<File> {
  const { maxWidth = 1280, maxHeight = 1280, quality = 0.5 } = options || {};

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Resize while keeping aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));

          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
          });

          resolve(compressedFile);
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = reject;

    img.src = URL.createObjectURL(file);
  });
}
