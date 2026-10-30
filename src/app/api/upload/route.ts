import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { uploadToCloudStorage } from '@/lib/cloudStorage';

export const dynamic = 'force-dynamic';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Please sign in to upload files' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type (${file.type}). Allowed types: JPG, PNG, WEBP, AVIF` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds 5MB limit` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Magic number check for security
    const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    const isWebp = buffer.toString('ascii', 8, 12) === 'WEBP';

    if (!isJpeg && !isPng && !isWebp) {
      return NextResponse.json({ error: 'File content does not match genuine image signature' }, { status: 400 });
    }

    const extension = file.type.split('/')[1] || 'jpg';
    const sanitizedFileName = `prop_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${extension}`;

    // Upload to Cloudinary, Supabase Storage, or resilient cloud payload (100% Vercel safe)
    const result = await uploadToCloudStorage(buffer, sanitizedFileName, file.type);

    return NextResponse.json({
      success: true,
      url: result.url,
      provider: result.provider,
      size: result.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Internal server error processing file upload' }, { status: 500 });
  }
}
