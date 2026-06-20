import { Component } from '@angular/core';
import { LanguageSwitcher } from '../../core/i18n/language-switcher';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'rk-home',
  standalone: true,
  imports: [TranslatePipe, LanguageSwitcher],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
