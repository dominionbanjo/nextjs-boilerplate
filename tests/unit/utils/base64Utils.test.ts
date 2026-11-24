import { describe, it, expect } from "vitest";
import { base64ToFile } from "@/utils/base64Utils";

describe("base64Utils Utility Unit Tests", () => {
  it("1. should parse standard base64 to File object correctly", () => {
    const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const file = base64ToFile(base64, "pixel.png");
    expect(file).not.toBeNull();
    expect(file?.name).toBe("pixel.png");
    expect(file?.type).toBe("image/png");
  });

  it("2. should return null for malformed base64 headers", () => {
    const file = base64ToFile("malformedbase64string", "test.png");
    expect(file).toBeNull();
  });

  it("3. should handle empty base64 strings gracefully", () => {
    const file = base64ToFile("", "test.png");
    expect(file).toBeNull();
  });

  it("4. should preserve custom filenames", () => {
    const base64 = "data:text/plain;base64,SGVsbG8=";
    const file = base64ToFile(base64, "hello.txt");
    expect(file?.name).toBe("hello.txt");
  });

  it("5. should parse text MIME types correctly", () => {
    const base64 = "data:text/plain;base64,SGVsbG8=";
    const file = base64ToFile(base64, "hello.txt");
    expect(file?.type).toBe("text/plain");
  });
});
