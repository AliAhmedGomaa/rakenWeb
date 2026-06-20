import { Component, inject } from '@angular/core';
import { I18nService, type Lang } from './i18n.service';

@Component({
  selector: 'rk-lang-switcher',
  standalone: true,
  template: `
    <div class="lang-switch" role="group" [attr.aria-label]="'Language'">
      @for (opt of options; track opt.key) {
        <button
          type="button"
          class="lang-btn"
          [class.active]="i18n.lang() === opt.key"
          (click)="pick(opt.key)"
        >
          {{ opt.label }}
        </button>
      }
    </div>
  `,
  styles: `
    .lang-switch {
      display: inline-flex;
      gap: 4px;
      padding: 4px;
      border-radius: 12px;
      background: var(--rk-surface);
      border: 1px solid var(--rk-border);
    }
    .lang-btn {
      border: 0;
      background: transparent;
      color: var(--rk-text-secondary);
      font-size: 12px;
      font-weight: 600;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
    }
    .lang-btn.active {
      background: var(--rk-white);
      color: var(--rk-primary);
      box-shadow: var(--rk-shadow-sm);
    }
  `,
})
export class LanguageSwitcher {
  readonly i18n = inject(I18nService);
  readonly options: { key: Lang; label: string }[] = [
    { key: 'en', label: 'EN' },
    { key: 'ar', label: 'ع' },
  ];

  pick(lang: Lang): void {
    this.i18n.setLanguage(lang);
  }
}
