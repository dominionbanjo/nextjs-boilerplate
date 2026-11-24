import { describe, it, expect } from "vitest";
import { generatePath, generatePathWithCatchAll } from "@/utils/generatePath";

describe("generatePath Utility Unit Tests", () => {
  it("1. should substitute basic parameters in bracket format", () => {
    const result = generatePath("/resources/[id]/details", { id: "123" });
    expect(result).toBe("/resources/123/details");
  });

  it("2. should substitute colon format parameters", () => {
    const result = generatePath("/resources/:id/details", { id: "456" });
    expect(result).toBe("/resources/456/details");
  });

  it("3. should throw error if bracketed parameter is missing", () => {
    expect(() => generatePath("/resources/[id]", {})).toThrowError(
      "Missing parameter: id"
    );
  });

  it("4. should handle catch all parameters", () => {
    const result = generatePathWithCatchAll("/resources/[[...slug]]", {
      slug: ["getting-started", "intro"],
    });
    expect(result).toBe("/resources/getting-started/intro");
  });

  it("5. should handle optional empty catch all parameters", () => {
    const result = generatePathWithCatchAll("/resources/[[...slug]]", {});
    expect(result).toBe("/resources/");
  });
});
