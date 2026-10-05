import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { YEARS_OF_EXPERIENCE } from './src/utils/experience.js'

// הכתובת המלאה של האתר. כשעוברים לדומיין אחר, משנים כאן או מגדירים SITE_URL בשרת ההעלאה
const SITE_URL = (process.env.SITE_URL || 'https://sargav.github.io/Sroia').replace(/\/$/, '')

// העמודים שגוגל צריך להכיר (בלי עמודי תודה ותשלום)
const PUBLIC_PAGES = ['/', '/projects', '/courses', '/application', '/guid-to-builder', '/benefit', '/contact', '/accessibility']
const PRIVATE_PAGES = ['/thank-you', '/pay', '/payment-result']

// מכניס את מספר שנות הניסיון לתיאור שגוגל מציג, כך שהוא מתעדכן בכל העלאה של האתר
const injectYearsOfExperience = {
  name: 'inject-years-of-experience',
  transformIndexHtml: (html) => html.replaceAll('%YEARS_OF_EXPERIENCE%', String(YEARS_OF_EXPERIENCE)),
}

// יוצר robots.txt ו-sitemap.xml בכל בנייה, כדי שגוגל ימצא את כל העמודים
const seoFiles = {
  name: 'seo-files',
  apply: 'build',
  generateBundle() {
    const today = new Date().toISOString().slice(0, 10)
    const urls = PUBLIC_PAGES.map((page) =>
      `  <url><loc>${SITE_URL}${page === '/' ? '/' : page}</loc><lastmod>${today}</lastmod></url>`
    ).join('\n')
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    })
    const basePath = new URL(SITE_URL).pathname.replace(/\/$/, '')
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\n${PRIVATE_PAGES.map((p) => `Disallow: ${basePath}${p}`).join('\n')}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    })
  },
}

export default defineConfig({
  base: '/Sroia/',
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer(),
    injectYearsOfExperience,
    seoFiles,
  ],
})
