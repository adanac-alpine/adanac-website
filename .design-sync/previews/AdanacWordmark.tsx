import { AdanacWordmark } from 'adanac-advisory'

export const OnLight = () => <AdanacWordmark />

export const OnNavy = () => (
  <div style={{ background: '#1a2332', padding: 32, display: 'inline-block', borderRadius: 12 }}>
    <AdanacWordmark color="#ffffff" incColor="rgba(255,255,255,0.35)" fontSize={24} />
  </div>
)

export const CompactNoInc = () => (
  <div style={{ background: '#1a2332', padding: 16, display: 'inline-block', borderRadius: 8 }}>
    <AdanacWordmark color="#ffffff" fontSize={14} showInc={false} />
  </div>
)
