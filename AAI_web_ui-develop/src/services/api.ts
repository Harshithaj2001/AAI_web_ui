/**
 * Placeholder API service layer.
 * When backend endpoints are available, API calls go here —
 * keeping network concerns out of components.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
};
