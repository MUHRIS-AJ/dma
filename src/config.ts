export const config = {
  siteUrl: (import.meta.env.VITE_SITE_URL || 'https://digitalmodacademy.example').replace(/\/$/, ''),
  ga4: import.meta.env.VITE_GA4_ID || '',
  metaPixel: import.meta.env.VITE_META_PIXEL_ID || '',
  whatsapp: '94784450088',
};
declare global { interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void; } }
export const campaign = () => {
  const p = new URLSearchParams(location.search);
  return Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].filter(k => p.has(k)).map(k => [k, p.get(k)!.slice(0,120)]));
};
export function track(name: string, params: Record<string, unknown> = {}) {
  if (localStorage.getItem('dma_analytics') !== 'granted') return;
  window.gtag?.('event', name, { ...campaign(), ...params });
}
export function enableAnalytics() {
  if (localStorage.getItem('dma_analytics') !== 'granted' || !/^G-[A-Z0-9]+$/.test(config.ga4) || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // Referrer paths, queries and fragments can contain personal information; retain only origin.
  let referrer = '';
  try { const value = new URL(document.referrer); if (/^https?:$/.test(value.protocol)) referrer = value.origin + '/'; } catch { /* No valid referrer. */ }
  window.gtag('set', { page_location: location.origin + location.pathname, page_referrer: referrer });
  window.gtag('config', config.ga4, {
    page_location: location.origin + location.pathname,
    page_referrer: referrer,
    page_title: document.title,
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  window.gtag('event', 'page_view', { page_location: location.origin + location.pathname, page_referrer: referrer, page_title: document.title });
  const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4}`; document.head.appendChild(s);
  // Meta Pixel intentionally inactive. Add an approved consent-aware loader after configuring VITE_META_PIXEL_ID.
  // Disable Enhanced Measurement form interactions and outbound clicks in the GA4 stream UI:
  // an automatic outbound event could include the WhatsApp draft (name/email) in link_url.
  // Those stream settings cannot reliably be changed with a client-side gtag config field.
}
export const courseHref = (slug: string) => `/courses/${slug}/${location.search}`;
