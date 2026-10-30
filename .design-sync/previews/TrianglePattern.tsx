import { TrianglePattern } from 'adanac-advisory'

export const DarkOnNavy = () => (
  <div className="relative h-48 w-80 overflow-hidden rounded-xl bg-navy">
    <TrianglePattern variant="dark" opacity={0.12} className="absolute inset-0 h-full w-full" />
  </div>
)

export const LightOnOffWhite = () => (
  <div className="relative h-48 w-80 overflow-hidden rounded-xl bg-gray-50 border border-gray-200">
    <TrianglePattern variant="light" opacity={0.12} className="absolute inset-0 h-full w-full" />
  </div>
)

export const HeroBackdrop = () => (
  <div className="relative flex h-48 w-80 items-center justify-center overflow-hidden rounded-xl bg-navy text-white">
    <TrianglePattern variant="dark" opacity={0.04} className="absolute inset-0 h-full w-full" />
    <p className="relative z-10 text-xl font-extrabold tracking-tight">Subtle hero texture</p>
  </div>
)
