import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (
    env.VITE_SITE_URL?.trim() || 'https://your-wedding-domain.com'
  ).replace(/\/+$/, '')

  const injectSiteUrl: Plugin = {
    name: 'inject-site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', siteUrl)
    },
  }

  return { plugins: [react(), tailwindcss(), injectSiteUrl] }
})