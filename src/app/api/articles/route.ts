import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    if (slug) {
      const article = await prisma.article.findUnique({
        where: { slug },
      });
      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json({ article });
    }

    const where: any = { isPublished: true };
    if (category && category !== 'All') {
      where.category = category;
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json({ articles });
  } catch (error: any) {
    console.error('Articles error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
