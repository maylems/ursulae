const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const BACKEND_URL =
  typeof window === 'undefined' ? (process.env.BACKEND_INTERNAL_URL ?? PUBLIC_URL) : PUBLIC_URL;

// Fetch wrapper for the ai-financial-control-backend repo's API (separate
// repo, separate origin) — distinct from `api-client.ts`, which targets this
// app's own `/api` routes. Every route there requires a Better Auth session token.
export async function backendClient<T>(
  endpoint: string,
  token: string | null,
  options?: RequestInit
): Promise<T> {
  if (!token) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      // Fastify's JSON parser rejects a request that declares this content
      // type but sends no body (e.g. our bodyless DELETE calls) with a 400.
      ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
      Authorization: `Bearer ${token}`,
      ...options?.headers
    }
  });

  if (!res.ok) {
    const body = await res.json().catch(() => undefined);
    const message = body?.error ? JSON.stringify(body.error) : res.statusText;
    throw new Error(`Backend error (${res.status}): ${message}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
