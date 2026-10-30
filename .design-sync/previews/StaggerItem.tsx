import { StaggerChildren, StaggerItem } from 'adanac-advisory'

const tags = ['Backbase', 'VeriPark', 'Salesforce', 'Azure', 'Fiserv DNA']

export const TagRow = () => (
  <StaggerChildren>
    <div className="flex flex-wrap gap-3">
      {tags.map((t, i) => (
        <StaggerItem key={t} delay={i * 0.08} scale={1}>
          <span className="rounded-full bg-glacier-50 px-4 py-1.5 text-sm font-medium text-glacier-700">{t}</span>
        </StaggerItem>
      ))}
    </div>
  </StaggerChildren>
)
