/** Format a large number with K / M suffix (e.g. 38_000 → "38k", 1_400_000 → "1.4M"). */
export function formatCompactNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
}

/** Format an ISO date string to a locale date string. */
export function formatDate(iso: string, locale = 'zh-CN'): string {
  try {
    return new Date(iso).toLocaleDateString(locale);
  } catch {
    return iso;
  }
}

/** Format an ISO date string to a locale date-time string. */
export function formatDateTime(iso: string, locale = 'zh-CN'): string {
  try {
    return new Date(iso).toLocaleString(locale);
  } catch {
    return iso;
  }
}

/** Truncate a string at maxLength with a trailing ellipsis. */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 1)}\u2026`;
}

/** Format file size in bytes to a human-readable string. */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
}
