import { AdanacMark } from 'adanac-advisory'

export const NavyTile = () => <AdanacMark size={96} />

export const OnNavy = () => (
  <div style={{ background: '#1a2332', padding: 24, display: 'inline-flex', borderRadius: 12 }}>
    <AdanacMark size={96} tile={false} fill="#ffffff" />
  </div>
)

export const GlacierTile = () => <AdanacMark size={96} bg="#4a90d9" />

export const NavyGlyphOnLight = () => <AdanacMark size={96} tile={false} fill="#1a2332" />

export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
    <AdanacMark size={24} />
    <AdanacMark size={48} />
    <AdanacMark size={96} />
  </div>
)
