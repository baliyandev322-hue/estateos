import { NextResponse } from 'next/server';

const SVG_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120" width="500" height="120">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081710" />
      <stop offset="50%" stop-color="#05100b" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f9e396" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#aa8210" />
    </linearGradient>
  </defs>
  <rect x="10" y="15" width="90" height="90" rx="22" fill="url(#bgGrad)" stroke="#d4af37" stroke-width="2" />
  <text x="55" y="77" font-family="serif, 'Playfair Display', Georgia" font-size="64" font-weight="900" fill="url(#goldGrad)" text-anchor="middle">E</text>
  <text x="120" y="70" font-family="serif, 'Playfair Display', Georgia" font-size="52" font-weight="900" fill="#ffffff">Estate<tspan fill="#d4af37">OS</tspan></text>
  <text x="122" y="94" font-family="sans-serif, 'Inter'" font-size="14" font-weight="800" fill="#94a3b8" letter-spacing="4">PROPTECH INTELLIGENCE</text>
</svg>`;

export async function GET() {
  return new NextResponse(SVG_LOGO, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
