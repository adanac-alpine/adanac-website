import '@testing-library/jest-dom/vitest'

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => {
  const react = require('react')
  return {
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => {
          return react.forwardRef(({ children, ...props }: any, ref: any) => {
            const filteredProps: Record<string, any> = {}
            for (const [key, val] of Object.entries(props)) {
              if (
                !key.startsWith('while') &&
                !key.startsWith('animate') &&
                !key.startsWith('initial') &&
                !key.startsWith('exit') &&
                !key.startsWith('transition') &&
                !key.startsWith('viewport') &&
                !key.startsWith('variants') &&
                key !== 'layout'
              ) {
                filteredProps[key] = val
              }
            }
            return react.createElement(prop, { ...filteredProps, ref }, children)
          })
        },
      }
    ),
    AnimatePresence: ({ children }: any) => children,
    useAnimation: () => ({ start: vi.fn() }),
    useInView: () => true,
  }
})

// Mock IntersectionObserver
global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any
