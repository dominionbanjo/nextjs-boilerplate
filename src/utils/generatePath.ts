export function generatePath(
  path: string,
  params: Record<string, string | number>,
): string {
  return path.replace(/\[([^\]]+)\]|:(\w+)/g, (_, bracketed, colon) => {
    const key = bracketed || colon;
    const value = params[key];

    if (value === undefined) {
      throw new Error(`Missing parameter: ${key}`);
    }

    return String(value);
  });
}

export function generatePathWithCatchAll(
  path: string,
  params: Record<string, string | number | string[]>,
): string {
  return path.replace(
    /\[\[?\.\.\.([^\]]+)\]\]?|\[([^\]]+)\]|:(\w+)/g,
    (match, catchAll, bracketed, colon) => {
      const key = catchAll || bracketed || colon;
      const value = params[key];

      if (value === undefined) {
        if (match.startsWith("[[")) {
          return "";
        }
        throw new Error(`Missing parameter: ${key}`);
      }

      if (Array.isArray(value)) {
        return value.join("/");
      }

      return String(value);
    },
  );
}
