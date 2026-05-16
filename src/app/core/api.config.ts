/**
 * Base URL of the Raken backend.
 *
 * When the web app runs on a different host than the backend (e.g. in
 * production, or when developing on a phone over LAN), override this via
 * `RAKEN_API_BASE_URL` injected at build/deploy time. We default to the
 * dev backend on http://localhost:3000.
 */
// export const API_BASE_URL = 'http://localhost:3000/api';
export const API_BASE_URL = 'https://raken-api.vercel.app/api';