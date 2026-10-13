/** Shared contact channels for CTAs across the site. */

export const CONTACT_EMAIL = "the.lunox.co@gmail.com";

/** Display formatting for the US line. */
export const CONTACT_PHONE_DISPLAY = "(508) 373-4944";

/** Digits with country code — used for tel: and WhatsApp. */
export const CONTACT_PHONE_E164 = "15083734944";

/** Same number on WhatsApp. */
export const CONTACT_WHATSAPP = CONTACT_PHONE_E164;

export function mailtoHref(opts?: { subject?: string; body?: string }): string {
  const subject = encodeURIComponent(opts?.subject ?? "Start a conversation with Lunox");
  const body = opts?.body ? `&body=${encodeURIComponent(opts.body)}` : "";
  return `mailto:${CONTACT_EMAIL}?subject=${subject}${body}`;
}

export function telHref(): string {
  return `tel:+${CONTACT_PHONE_E164}`;
}

export function whatsappHref(prefill?: string): string {
  const text = prefill ? `?text=${encodeURIComponent(prefill)}` : "";
  return `https://wa.me/${CONTACT_WHATSAPP.replace(/\D/g, "")}${text}`;
}
