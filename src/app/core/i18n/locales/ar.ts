export const AR = {
  brand: 'RAKEN',
  lang: { en: 'English', ar: 'العربية' },
  home: {
    title: 'تواصل مجهول مع أي سيارة.',
    body:
      'راكن يمنح كل سيارة ملصق QR. امسحه لإرسال رسالة خاصة أو اتصال أو رسالة نصية لمالك السيارة — دون رؤية رقم هاتفه.',
    hint:
      'امسح رمز RAKEN للبدء، أو حمّل التطبيق لإنشاء ملصق لسيارتك.',
    features: {
      chatTitle: 'محادثة مجهولة',
      chatDesc: 'تحدّث مع المالك داخل التطبيق.',
      callTitle: 'اتصال بنقرة',
      callDesc: 'تواصل فوراً إذا شارك رقمه.',
      smsTitle: 'رسالة نصية',
      smsDesc: 'أرسل رسالة سريعة وانصرف.',
    },
  },
  scan: {
    loading: 'جاري تحميل السيارة…',
    notFoundTitle: 'رمز QR غير نشط.',
    notFoundText: 'ربما أزاله المالك أو الرمز غير صحيح.',
    backHome: 'العودة للرئيسية',
    errorTitle: 'حدث خطأ',
    plateLabel: 'اللوحة',
    intro:
      'أنت تتواصل مع سيارة {{name}}. اكتب رسالتك — ستصل فوراً في تطبيق RAKEN.',
    paused: 'مالك السيارة أوقف التواصل مؤقتاً لهذه السيارة.',
    sendChat: 'إرسال محادثة',
    sendChatSub: 'رسالة مجهولة داخل التطبيق',
    call: 'اتصال',
    sms: 'رسالة نصية',
    smsSub: 'أرسل رسالة سريعة',
    smsBody: 'مرحباً! أتواصل معك بخصوص {{make}} {{model}} ({{plate}}).',
    chatTitle: 'محادثة داخل التطبيق',
    hideChat: 'إخفاء',
    messagePlaceholder:
      'اكتب رسالتك — مثلاً: «مرحباً، سيارتك تسد المخرج.»',
    privacyHint:
      'هويتك لا تُشارك أبداً. يرى المالك اسماً مثل «مجهول #1».',
    send: 'إرسال الرسالة',
    sending: 'جاري الإرسال…',
    sendError: 'تعذّر الإرسال. حاول مرة أخرى.',
    loadError: 'تعذّر تحميل بيانات السيارة حالياً.',
    unassignedTitle: 'اربط هذا الملصق في تطبيق RAKEN',
    unassignedText:
      'ملصق QR هذا غير مربوط بسيارة بعد. افتح تطبيق RAKEN لإضافة بيانات سيارتك وتفعيله.',
    openApp: 'فتح تطبيق RAKEN',
    powered: 'مدعوم من RAKEN',
    status: {
      sent: 'مُرسَل',
      delivered: 'مُسلَّم',
      read: 'مقروء',
    },
  },
  colors: {
    white: 'أبيض',
    silver: 'فضي',
    black: 'أسود',
    gray: 'رمادي',
    red: 'أحمر',
    blue: 'أزرق',
    green: 'أخضر',
    yellow: 'أصفر',
  },
} as const;
