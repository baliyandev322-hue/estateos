import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Google AdSense ads.txt for EstateOS
google.com, pub-8670788447807706, DIRECT, f08c47fec0942fa0
`;
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
