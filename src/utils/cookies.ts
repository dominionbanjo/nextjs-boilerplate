function getRootDomain(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment) return undefined;

  const envRoot = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  if (envRoot) return `.${envRoot}`;

  const hostname = window.location.hostname;
  return `.${hostname}`;
}

export function setCookie(name: string, value: string, days: number = 7) {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  const rootDomain = getRootDomain();
  const domainPart = rootDomain ? `;domain=${rootDomain}` : "";
  const securePart =
    process.env.NODE_ENV !== "development" || window.location.protocol === "https:"
      ? ";Secure"
      : "";

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/${domainPart};SameSite=Lax${securePart}`;
}

export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

export function deleteCookie(name: string) {
  if (typeof window === "undefined") return;

  const securePart =
    process.env.NODE_ENV !== "development" || window.location.protocol === "https:"
      ? ";Secure"
      : "";
  const suffix = `;path=/;SameSite=Lax${securePart}`;

  // Clear for current domain
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC${suffix}`;

  // Clear for root domain if applicable
  const rootDomain = getRootDomain();
  if (rootDomain) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${rootDomain}${suffix}`;
  }

  // Common domains to try as fallback (especially for localhost development)
  const host = window.location.hostname;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${host}${suffix}`;
}

export function clearAllCookies() {
  if (typeof window === "undefined") return;

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    if (name) {
      deleteCookie(name);
    }
  }
}
