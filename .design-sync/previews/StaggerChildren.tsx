import { StaggerChildren, StaggerItem } from 'adanac-advisory'

const steps = [
  { step: 'Step 01', title: 'Discovery', body: 'Learn your business, your members, and your current technology landscape.' },
  { step: 'Step 02', title: 'Implementation', body: 'Hands-on delivery: platform configuration, integration, and data migration.' },
  { step: 'Step 03', title: 'Launch', body: 'Testing, training, and post-launch support so your teams own the platform.' },
]

export const ThreeStepGrid = () => (
  <StaggerChildren stagger={0.15}>
    <div className="grid grid-cols-3 gap-6">
      {steps.map((s) => (
        <StaggerItem key={s.title}>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-glacier">{s.step}</p>
            <h3 className="mt-2 font-semibold text-navy">{s.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{s.body}</p>
          </div>
        </StaggerItem>
      ))}
    </div>
  </StaggerChildren>
)
