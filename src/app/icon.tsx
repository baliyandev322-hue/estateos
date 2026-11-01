import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: 'linear-gradient(135deg, #081710 0%, #0d2319 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d4af37',
          borderRadius: 8,
          fontWeight: 900,
          fontFamily: 'serif',
          border: '1px solid #d4af37',
        }}
      >
        E
      </div>
    ),
    {
      ...size,
    }
  );
}
