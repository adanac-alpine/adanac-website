// Embeds public/logos and public/images as data URIs for the design bundle (see next-image.tsx).
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, extname, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const pub = join(root, 'public')
const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' }
const assets = {}
const walk = (dir) => {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (mime[extname(name)]) assets['/' + relative(pub, p)] = `data:${mime[extname(name)]};base64,${readFileSync(p).toString('base64')}`
  }
}
for (const d of ['logos', 'images']) walk(join(pub, d))
mkdirSync(join(root, '.design-sync/.cache'), { recursive: true })
writeFileSync(join(root, '.design-sync/.cache/public-assets.ts'), `export const assets: Record<string, string> = ${JSON.stringify(assets, null, 1)}\n`)
console.log(`gen-assets: ${Object.keys(assets).length} files`)
