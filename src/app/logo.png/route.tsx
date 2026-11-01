import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #06140d 0%, #0d281a 100%)',
          padding: '20px 40px',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: '#040d08',
            border: '2px solid #d4af37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            color: '#d4af37',
            fontWeight: 900,
            fontFamily: 'serif',
            marginRight: 24,
          }}
        >
          E
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 52, fontWeight: 900, color: '#ffffff', fontFamily: 'serif' }}>Estate</span>
            <span style={{ fontSize: 52, fontWeight: 900, color: '#d4af37', fontFamily: 'serif' }}>OS</span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#a3b899', letterSpacing: 6, textTransform: 'uppercase' }}>
            PropTech Intelligence
          </span>
        </div>
      </div>
    ),
    {
      width: 512,
      height: 160,
    }
  );
}
