import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import type {
  ContactMethod,
  PublicCar,
  VisitorMessage,
} from '../../core/api.types';
import { VisitorTokenService } from '../../core/visitor-token.service';

type Status = 'loading' | 'ready' | 'not-found' | 'error';
type ChatStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'rk-scan',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './scan-page.html',
  styleUrl: './scan-page.scss',
})
export class ScanPage implements OnInit, AfterViewChecked {
  /** Route param wired via `withComponentInputBinding()`. */
  @Input() carId?: string;

  @ViewChild('messageList') private messageList?: ElementRef<HTMLDivElement>;

  private readonly api = inject(ApiService);
  private readonly tokens = inject(VisitorTokenService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cd = inject(ChangeDetectorRef);

  status: Status = 'loading';
  errorMessage = '';

  car: PublicCar | null = null;
  composerOpen = false;

  text = '';
  chatStatus: ChatStatus = 'idle';
  chatError = '';
  messages: VisitorMessage[] = [];
  private shouldScrollOnNextCheck = false;

  async ngOnInit() {
    // SSR pass returns "loading" — the browser hydration kicks in below.
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.carId) {
      this.status = 'not-found';
      return;
    }
    await this.loadCar();
    await this.hydrateThreadIfAny();
  }

  ngAfterViewChecked() {
    if (this.shouldScrollOnNextCheck && this.messageList) {
      const el = this.messageList.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.shouldScrollOnNextCheck = false;
    }
  }

  // ── Public actions (used by the template) ────────────────────────────────
  openComposer() {
    this.composerOpen = true;
    this.shouldScrollOnNextCheck = true;
  }

  closeComposer() {
    this.composerOpen = false;
  }

  async sendMessage() {
    const trimmed = this.text.trim();
    if (!trimmed || !this.carId || this.chatStatus === 'sending') return;

    this.chatStatus = 'sending';
    this.chatError = '';

    // Optimistic append so the user sees their bubble immediately.
    const optimisticId = `tmp_${Date.now()}`;
    const optimisticMsg: VisitorMessage = {
      id: optimisticId,
      senderId: 'me',
      text: trimmed,
      timestamp: Date.now(),
      status: 'sent',
    };
    this.messages = [...this.messages, optimisticMsg];
    this.shouldScrollOnNextCheck = true;
    const draftToRestore = this.text;
    this.text = '';

    try {
      const token = this.tokens.get(this.carId) ?? undefined;
      const res = await this.api.sendContact(this.carId, {
        text: trimmed,
        visitorToken: token,
      });
      this.tokens.set(this.carId, res.visitorToken);
      // Replace the optimistic entry with the canonical id from the server.
      this.messages = this.messages.map(m =>
        m.id === optimisticId
          ? { ...m, id: res.messageId, status: 'delivered' }
          : m,
      );
      this.chatStatus = 'sent';
      this.shouldScrollOnNextCheck = true;
    } catch (err) {
      this.text = draftToRestore;
      this.messages = this.messages.filter(m => m.id !== optimisticId);
      this.chatError = this.extractMessage(err) ?? 'Could not send. Try again.';
      this.chatStatus = 'error';
    } finally {
      // Ensure the template re-evaluates after the awaited request resolves,
      // otherwise the "Sending…" button label can stick on some setups.
      this.cd.markForCheck();
    }
  }

  // ── Derived data ────────────────────────────────────────────────────────
  get carLabel(): string {
    if (!this.car) return '';
    return this.car.nickname ?? `${this.car.make} ${this.car.model}`;
  }

  hasMethod(method: ContactMethod): boolean {
    return !!this.car?.methods.includes(method);
  }

  get callHref(): string | null {
    return this.car?.owner.phone ? `tel:${this.car.owner.phone}` : null;
  }

  get smsHref(): string | null {
    return this.car?.owner.phone
      ? `sms:${this.car.owner.phone}?body=${encodeURIComponent(
          `Hi! I'm contacting you about your ${this.car.make} ${this.car.model} (${this.car.plate}).`,
        )}`
      : null;
  }

  // ── Internals ───────────────────────────────────────────────────────────
  private async loadCar() {
    this.status = 'loading';
    this.errorMessage = '';
    try {
      this.car = await this.api.getPublicCar(this.carId!);
      this.status = 'ready';
    } catch (err) {
      if (err instanceof HttpErrorResponse && err.status === 404) {
        this.status = 'not-found';
        return;
      }
      this.errorMessage =
        this.extractMessage(err) ?? 'We could not load this car right now.';
      this.status = 'error';
    } finally {
      this.cd.markForCheck();
    }
  }

  private async hydrateThreadIfAny() {
    if (!this.carId) return;
    const token = this.tokens.get(this.carId);
    if (!token) return;
    try {
      const thread = await this.api.getVisitorThread(this.carId, token);
      this.messages = thread.messages;
      if (this.messages.length > 0) {
        this.composerOpen = true;
        this.shouldScrollOnNextCheck = true;
      }
    } catch {
      // Non-fatal — visitor can just start a new conversation.
    }
  }

  private extractMessage(err: unknown): string | null {
    if (err instanceof HttpErrorResponse) {
      const body = err.error as { message?: unknown } | null;
      if (body && typeof body.message === 'string') return body.message;
      if (
        body &&
        Array.isArray(body.message) &&
        typeof body.message[0] === 'string'
      ) {
        return body.message[0];
      }
      return err.message;
    }
    if (err instanceof Error) return err.message;
    return null;
  }
}
