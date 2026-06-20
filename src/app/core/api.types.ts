export type ContactMethod = 'chat' | 'call' | 'sms';

export interface PublicCar {
  id: string;
  plate: string;
  make: string;
  model: string;
  year?: number;
  color: string;
  nickname?: string;
  acceptingContact: boolean;
  owner: {
    firstName: string;
    phone?: string;
  };
  methods: ContactMethod[];
}

export interface ContactResponse {
  ok: true;
  chatId: string;
  visitorToken: string;
  messageId: string;
  participantLabel: string;
}

export interface VisitorMessage {
  id: string;
  senderId: 'me' | 'other' | string;
  text: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
}

export interface VisitorThread {
  chatId?: string;
  participantLabel: string | null;
  messages: VisitorMessage[];
}

export interface PublicSticker {
  code: string;
  assigned: boolean;
  url: string;
}
