export const EN = {
  brand: 'RAKEN',
  lang: { en: 'English', ar: 'العربية' },
  home: {
    title: 'Anonymous contact for any car.',
    body:
      'Raken gives every car a QR sticker. Scan it to send the owner a private message, call, or text — without ever seeing their phone number.',
    hint:
      'Scan a Raken QR to get started, or download the Raken app to mint one for your own car.',
    features: {
      chatTitle: 'Anonymous chat',
      chatDesc: 'Talk to the owner in-app.',
      callTitle: 'One-tap call',
      callDesc: 'Reach them instantly if they shared a number.',
      smsTitle: 'SMS fallback',
      smsDesc: 'Drop a quick text and walk away.',
    },
  },
  scan: {
    loading: 'Loading car…',
    notFoundTitle: "This QR isn't active.",
    notFoundText:
      'The owner may have removed it or it may have been mistyped.',
    backHome: 'Back to home',
    errorTitle: 'Something went wrong',
    plateLabel: 'PLATE',
    intro: "You're scanning {{name}}'s car. Drop a message — they'll see it instantly in the Raken app.",
    paused:
      'The owner has temporarily paused contact for this car.',
    sendChat: 'Send a chat',
    sendChatSub: 'Anonymous in-app message',
    call: 'Call',
    sms: 'SMS',
    smsSub: 'Send a quick text',
    smsBody:
      "Hi! I'm contacting you about your {{make}} {{model}} ({{plate}}).",
    chatTitle: 'In-app chat',
    hideChat: 'Hide',
    messagePlaceholder:
      'Type your message — e.g. “Hi, your car is blocking my exit.”',
    privacyHint:
      'Your identity is never shared. The owner sees a label like “Anonymous #1”.',
    send: 'Send message',
    sending: 'Sending…',
    sendError: 'Could not send. Try again.',
    loadError: 'We could not load this car right now.',
    unassignedTitle: 'Link this sticker in the Raken app',
    unassignedText:
      'This QR sticker is not linked to a car yet. Open the Raken app to add your vehicle details and activate it.',
    openApp: 'Open Raken app',
    powered: 'Powered by Raken',
    status: {
      sent: 'sent',
      delivered: 'delivered',
      read: 'read',
    },
  },
  colors: {
    white: 'White',
    silver: 'Silver',
    black: 'Black',
    gray: 'Gray',
    red: 'Red',
    blue: 'Blue',
    green: 'Green',
    yellow: 'Yellow',
  },
} as const;
