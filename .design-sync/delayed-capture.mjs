// Screenshot each card after animations settle: node delayed-capture.mjs <outDir> <shotDir> <group/Name[:story]>...
import { createRequire } from 'node:module'
const { chromium } = createRequire(new URL('../.ds-sync/package.json', import.meta.url))('playwright')
import { serveDir } from '../.ds-sync/storybook/http-serve.mjs'
const [out, shots, ...cards] = process.argv.slice(2)
const { srv, port } = await serveDir(out)
const browser = await chromium.launch({ executablePath: process.env.DS_CHROMIUM_PATH })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
for (const card of cards) {
  const [path, story] = card.split(':')
  const name = path.split('/')[1]
  await page.goto(`http://127.0.0.1:${port}/components/${path}/${name}.html${story ? `?story=${story}` : ''}`)
  await page.waitForTimeout(3500)
  await page.screenshot({ path: `${shots}/${name}${story ? '-' + story : ''}.png`, fullPage: true })
}
await browser.close(); srv.close()
