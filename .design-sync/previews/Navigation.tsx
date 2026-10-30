import { Navigation } from 'adanac-advisory'

// Navigation is position:fixed with white links over a transparent bar - it is designed to sit over
// the navy Hero. The transform creates a containing block so it renders inside this frame.
export const OverHero = () => (
  <div className="relative h-24 bg-navy" style={{ transform: 'translateZ(0)' }}>
    <Navigation />
  </div>
)
