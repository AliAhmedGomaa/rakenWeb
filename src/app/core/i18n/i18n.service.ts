import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AR } from './locales/ar';
import { EN } from './locales/en';

export type Lang = 'en' | 'ar';
export const LANG_STORAGE_KEY = 'raken_web_lang';

type MessageDict = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly lang = signal<Lang>('en');
  readonly isRtl = computed(() => this.lang() === 'ar');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.bootstrap();
    }
  }

  t(key: string, params?: Record<string, string | number>): string {
    const dict: MessageDict =
      this.lang() === 'ar' ? (AR as MessageDict) : (EN as MessageDict);
    const parts = key.split('.');
    let node: unknown = dict;
    for (const p of parts) {
      if (node && typeof node === 'object' && p in (node as object)) {
        node = (node as Record<string, unknown>)[p];
      } else {
        return key;
      }
    }
    if (typeof node !== 'string') return key;
    let out = node;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        out = out.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
      }
    }
    return out;
  }

  setLanguage(lang: Lang): void {
    if (lang === this.lang()) return;
    this.lang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
      } catch {
        // private mode
      }
      this.applyDocumentAttributes(lang);
    }
  }

  private bootstrap(): void {
    let lang: Lang = 'en';
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === 'ar' || stored === 'en') {
        lang = stored;
      } else if (typeof navigator !== 'undefined') {
        const nav = navigator.language?.toLowerCase() ?? '';
        if (nav.startsWith('ar')) lang = 'ar';
      }
    } catch {
      // ignore
    }
    this.lang.set(lang);
    this.applyDocumentAttributes(lang);
  }

  private applyDocumentAttributes(lang: Lang): void {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
