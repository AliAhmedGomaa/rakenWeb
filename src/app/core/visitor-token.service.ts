import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_PREFIX = 'raken_visitor_';

/**
 * Persists the visitor's opaque token per-car in localStorage so a single
 * visitor's messages all land in the same chat thread on the owner side.
 *
 * SSR-safe: returns null and no-ops on the server.
 */
@Injectable({ providedIn: 'root' })
export class VisitorTokenService {
  private readonly platformId = inject(PLATFORM_ID);

  private get available() {
    return isPlatformBrowser(this.platformId);
  }

  get(carId: string): string | null {
    if (!this.available) return null;
    try {
      return localStorage.getItem(STORAGE_PREFIX + carId);
    } catch {
      return null;
    }
  }

  set(carId: string, token: string): void {
    if (!this.available) return;
    try {
      localStorage.setItem(STORAGE_PREFIX + carId, token);
    } catch {
      // ignore — visitor may be in private mode
    }
  }
}
