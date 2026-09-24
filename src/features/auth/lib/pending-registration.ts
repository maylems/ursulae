const STORAGE_KEY = 'ursulae.pending-registration';

export interface PendingRegistration {
  email: string;
  tempPassword: string;
  createdAt: number;
}

export function setPendingRegistration(registration: PendingRegistration): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(registration));
}

export function getPendingRegistration(): PendingRegistration | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingRegistration;
    if (!parsed.email || !parsed.tempPassword) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingRegistration(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function generateTempPassword(): string {
  const bytes = new Uint8Array(12);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
