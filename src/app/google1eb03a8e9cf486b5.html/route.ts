import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: google1eb03a8e9cf486b5.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
