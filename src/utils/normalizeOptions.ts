export const normalizeOptions = (
  options: string | string[] | null | undefined,
): string[] => {
  if (!options) return [];

  if (Array.isArray(options)) {
    return options;
  }

  if (typeof options === "string") {
    try {
      return JSON.parse(options);
    } catch {
      return [];
    }
  }

  return [];
};
