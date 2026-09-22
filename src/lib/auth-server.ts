import { cookies } from 'next/headers';

const COOKIE_NAMES = ['better-auth.session_token', '__Secure-better-auth.session_token'];

// Session token from Better Auth's cookie (set by the backend on localhost).
// Presence only: the backend validates it on every API call and the client
// SessionGuard handles expired sessions.
export async function getServerAuth() {
  const cookieStore = await cookies();
  const raw = COOKIE_NAMES.map((name) => cookieStore.get(name)?.value).find(Boolean);
  const token = raw ? decodeURIComponent(raw) : null;

  return {
    isSignedIn: token !== null,
    getToken: async () => token
  };
}
