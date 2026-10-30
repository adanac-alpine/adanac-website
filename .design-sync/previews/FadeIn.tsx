import { FadeIn } from 'adanac-advisory'

export const SectionHeading = () => (
  <FadeIn>
    <div className="max-w-xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-glacier">How I work</p>
      <h2 className="mt-2 text-3xl font-bold text-navy">From first call to production</h2>
      <p className="mt-3 text-gray-600">Each element fades and rises into place the first time it scrolls into view.</p>
    </div>
  </FadeIn>
)

export const SlideFromLeft = () => (
  <FadeIn x={-30} y={0} delay={0.1}>
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-navy">Backbase Delivery</h3>
      <p className="mt-2 text-sm text-gray-600">Senior BA with deep Backbase platform experience.</p>
    </div>
  </FadeIn>
)
