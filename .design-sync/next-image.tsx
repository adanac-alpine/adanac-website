// Sync-only stand-in for next/image (aliased via .design-sync/tsconfig.json). The design runtime has
// no Next image optimizer and no public/ dir, so site-root paths resolve to embedded data URIs.
import * as React from 'react'
import { assets } from './.cache/public-assets'

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string | { src: string }
  fill?: boolean
  priority?: boolean
  quality?: number | string
  placeholder?: string
  blurDataURL?: string
  unoptimized?: boolean
  loader?: unknown
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, fill, priority, quality, placeholder, blurDataURL, unoptimized, loader, loading, style, ...rest },
  ref,
) {
  const path = typeof src === 'string' ? src : src.src
  const fillStyle = fill ? { position: 'absolute' as const, inset: 0, width: '100%', height: '100%' } : undefined
  return <img ref={ref} src={assets[path] ?? path} loading={priority ? 'eager' : loading} style={{ ...fillStyle, ...style }} {...rest} />
})

export default Image
