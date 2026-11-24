export function getRootDomain(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";
  }

  const envRoot = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  if (envRoot) return envRoot;

  return window.location.hostname;
}

export function buildTenantUrl(subdomain: string, path: string): string {
  const rootDomain = getRootDomain();
  if (typeof window === "undefined") {
    return `https://${subdomain}.${rootDomain}${path}`;
  }

  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    return path;
  }

  return `https://${subdomain}.${rootDomain}${path}`;
}

export function getRootUrl(): string {
  const rootDomain = getRootDomain();
  if (typeof window === "undefined") {
    return `https://${rootDomain}`;
  }

  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    return "http://localhost:3000";
  }

  return `https://${rootDomain}`;
}

export function shouldUseSubdomainRedirect(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  return process.env.NODE_ENV !== "development";
}

export function getCurrentSubdomain(): string | null {
  if (typeof window === "undefined") return null;

  const hostname = window.location.hostname;

  if (hostname === "localhost") {
    return null;
  }

  const rootDomain = getRootDomain();

  if (hostname.endsWith(`.${rootDomain}`)) {
    const subdomain = hostname.replace(`.${rootDomain}`, "");
    if (subdomain === "www") {
      return null;
    }
    return subdomain;
  }

  return null;
}
