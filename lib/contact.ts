export const whatsappNumber = "33786034629";

export const defaultWhatsappMessage =
  "Bonjour Medhi, je souhaite échanger concernant la création ou la refonte de mon site internet.";

export function whatsappHref(message = defaultWhatsappMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
