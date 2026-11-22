export const SHEMA_WHATSAPP_NUMBER = '255755000192';
export const SHEMA_WHATSAPP_DISPLAY = '+255 755 000 192';
export const SHEMA_DUBAI_DISPLAY = '+971 50 000 0192';
export const SHEMA_EMAIL = 'support@shemadigital.co.tz';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SHEMA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppMessage(params: {
  action: 'order' | 'price' | 'request';
  productName: string;
  brand?: string;
  availability?: 'local_tanzania' | 'dubai_order';
  color?: string;
  storage?: string;
  specs?: string;
  notes?: string;
}): string {
  const {
    action,
    productName,
    brand,
    availability,
    color,
    storage,
    specs,
    notes,
  } = params;

  const header =
    action === 'price'
      ? 'Hello Shema Electronics & Digital Services, I would like to *Request Price & Availability* for:'
      : action === 'request'
      ? 'Hello Shema Electronics & Digital Services, I would like to *Request a Product / Custom Sourcing*:'
      : 'Hello Shema Electronics & Digital Services, I would like to *Order via WhatsApp*:';

  const lines = [
    header,
    `• Product: ${brand ? `${brand} ` : ''}${productName}`,
  ];

  if (availability) {
    lines.push(
      `• Sourcing: ${
        availability === 'local_tanzania'
          ? 'Available Locally in Tanzania'
          : 'Available on Order (Sourced from Dubai, UAE)'
      }`
    );
  }
  if (storage) lines.push(`• Storage / Capacity: ${storage}`);
  if (color) lines.push(`• Colour: ${color}`);
  if (specs) lines.push(`• Specifications: ${specs}`);
  if (notes) lines.push(`• Notes: ${notes}`);

  lines.push('Please confirm current price, availability, and delivery timeline.');
  return lines.join('\n');
}

export function buildServiceWhatsAppMessage(params: {
  serviceTitle: string;
  category: string;
  portalUrl?: string;
  notes?: string;
}): string {
  const lines = [
    'Hello Shema Electronics & Digital Services, I need assistance with a *Digital Service*:',
    `• Service: ${params.serviceTitle}`,
    `• Category: ${params.category}`,
  ];
  if (params.portalUrl) {
    lines.push(`• Official Portal: ${params.portalUrl}`);
  }
  if (params.notes) {
    lines.push(`• Details: ${params.notes}`);
  }
  lines.push('Kindly guide me on requirements, fees, and next steps.');
  return lines.join('\n');
}
