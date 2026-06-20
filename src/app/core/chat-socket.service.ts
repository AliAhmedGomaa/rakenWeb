import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { io, type Socket } from 'socket.io-client';
import { SOCKET_URL } from './socket.config';
import type { VisitorMessage } from './api.types';

export type VisitorChatUpdate = {
  messages: VisitorMessage[];
  chatId?: string;
};

@Injectable({ providedIn: 'root' })
export class ChatSocketService implements OnDestroy {
  private readonly zone = inject(NgZone);
  private socket: Socket | null = null;
  private chatId: string | null = null;

  connectVisitor(chatId: string, visitorToken: string) {
    if (this.socket?.connected && this.chatId === chatId) return;

    this.disconnect();
    this.chatId = chatId;

    this.socket = io(`${SOCKET_URL}/chat`, {
      auth: { chatId, visitorToken },
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    this.socket.emit('join_visitor', { chatId, visitorToken });
  }

  onChatUpdated(handler: (update: VisitorChatUpdate) => void) {
    if (!this.socket) return () => undefined;

    const listener = (chat: {
      id: string;
      messages?: Array<{
        id: string;
        senderId: string;
        text: string;
        timestamp: number;
        status: string;
      }>;
    }) => {
      if (!chat.messages?.length) return;
      this.zone.run(() => {
        handler({
          chatId: chat.id,
          messages: chat.messages!.map(m => this.mapForVisitor(m)),
        });
      });
    };

    this.socket.on('chat:updated', listener);
    return () => this.socket?.off('chat:updated', listener);
  }

  /** Backend uses me=owner, other=visitor; flip for visitor UI. */
  mapForVisitor(msg: {
    id: string;
    senderId: string;
    text: string;
    timestamp: number;
    status: string;
  }): VisitorMessage {
    const senderId =
      msg.senderId === 'me'
        ? 'other'
        : msg.senderId === 'other'
          ? 'me'
          : msg.senderId;
    return {
      id: msg.id,
      senderId,
      text: msg.text,
      timestamp: msg.timestamp,
      status: msg.status as VisitorMessage['status'],
    };
  }

  disconnect() {
    this.socket?.removeAllListeners();
    this.socket?.disconnect();
    this.socket = null;
    this.chatId = null;
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
