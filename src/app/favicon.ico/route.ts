import { NextResponse } from 'next/server';

const SVG_FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#081710" stroke="#d4af37" stroke-width="2" />
  <text x="32" y="44" font-family="serif, 'Playfair Display', Georgia" font-size="40" font-weight="900" fill="#d4af37" text-anchor="middle">E</text>
</svg>`;

export async function GET() {
  return new NextResponse(SVG_FAVICON, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
