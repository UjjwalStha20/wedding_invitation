import { spawn, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const publicDir = join(projectRoot, 'public')
const imageDir = join(publicDir, 'images')

const chromeCandidates = [
  process.env.CHROME_BIN,
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
].filter(Boolean)

const chrome = chromeCandidates.find((candidate) => existsSync(candidate))

if (!chrome) {
  throw new Error('No Chrome/Chromium executable found. Set CHROME_BIN.')
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.woff2': 'font/woff2',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://127.0.0.1')
    const pathname = decodeURIComponent(url.pathname)
    const rootFile = resolve(projectRoot, `.${normalize(pathname)}`)
    const publicFile = resolve(publicDir, `.${normalize(pathname)}`)
    const filePath = existsSync(rootFile) ? rootFile : publicFile

    if (!filePath.startsWith(projectRoot)) {
      response.writeHead(403)
      response.end('Forbidden')
      return
    }

    const data = await readFile(filePath)
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(filePath)] ?? 'application/octet-stream',
    })
    response.end(data)
  } catch {
    response.writeHead(404)
    response.end('Not found')
  }
})

await new Promise((resolveListen) => {
  server.listen(0, '127.0.0.1', resolveListen)
})

const address = server.address()
const port = typeof address === 'object' && address ? address.port : 0
const baseUrl = `http://127.0.0.1:${port}`

function screenshot(pathname, fileName, width, height) {
  const output = join(projectRoot, fileName)
  const args = [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    '--virtual-time-budget=3500',
    `--user-data-dir=/tmp/wedding-assets-chrome-${process.pid}-${width}`,
    `--screenshot=${output}`,
    `${baseUrl}${pathname}`,
  ]

  return new Promise((resolveScreenshot, rejectScreenshot) => {
    const child = spawn(chrome, args, { stdio: 'inherit' })
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      rejectScreenshot(new Error(`Chrome timed out rendering ${pathname}`))
    }, 60000)

    child.on('error', (error) => {
      clearTimeout(timer)
      rejectScreenshot(error)
    })

    child.on('exit', (code) => {
      clearTimeout(timer)
      if (code === 0) {
        resolveScreenshot(output)
      } else {
        rejectScreenshot(
          new Error(`Chrome failed while rendering ${pathname} (exit ${code})`),
        )
      }
    })
  })
}

function resize(source, target, size) {
  const result = spawnSync(
    'magick',
    [source, '-filter', 'Lanczos', '-resize', `${size}x${size}`, target],
    { stdio: 'inherit' },
  )

  if (result.status !== 0) {
    throw new Error(`ImageMagick failed while resizing ${target}`)
  }
}

await mkdir(imageDir, { recursive: true })

const ogImage = await screenshot(
  '/scripts/og-template.html',
  'public/images/og-image.png',
  1200,
  630,
)
const iconSource = await screenshot(
  '/scripts/icon-template.html',
  'public/icon-512.png',
  512,
  512,
)

resize(iconSource, join(publicDir, 'favicon-32.png'), 32)
resize(iconSource, join(publicDir, 'apple-touch-icon.png'), 180)
resize(iconSource, join(publicDir, 'icon-192.png'), 192)
resize(iconSource, join(publicDir, 'icon-512.png'), 512)

server.close()

console.log(`Generated ${ogImage}`)
console.log('Generated favicon PNGs in public/')
