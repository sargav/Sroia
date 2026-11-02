import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import fs from 'node:fs'
import process from 'node:process'
import path from 'node:path'
import { YEARS_OF_EXPERIENCE } from './src/utils/experience.js'
import { PAGES, SITE_NAME } from './src/seo/pages.js'

// הכתובת המלאה של האתר (בשביל sitemap.xml ו-robots.txt).
// ב-Render מגדירים SITE_URL במשתני הסביבה. ברירת המחדל - הדומיין של האתר
const SITE_URL = (process.env.SITE_URL || 'https://sroia.co.il').replace(/\/$/, '')

// העמודים שגוגל צריך להכיר (בלי עמודי תודה ותשלום)
const PUBLIC_PAGES = ['/', '/projects', '/courses', '/application', '/guid-to-builder', '/benefit', '/contact', '/accessibility']
const PRIVATE_PAGES = ['/thank-you', '/pay', '/payment-result']

// מחליף את %SEO_...% ב-index.html בפרטים של עמוד מסוים (מתוך src/seo/pages.js)
const escapeAttr = (text) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const fillSeo = (html, page) => {
  const meta = PAGES[page] || PAGES['/']
  const title = `${meta.title} | ${SITE_NAME}`
  const description = meta.description.replaceAll('%YEARS%', String(YEARS_OF_EXPERIENCE))
  return html
    .replaceAll('%SEO_TITLE%', escapeAttr(title))
    .replaceAll('%SEO_DESCRIPTION%', escapeAttr(description))
    .replaceAll('%SEO_URL%', `${SITE_URL}${page}`)
    .replaceAll('%SITE_URL%', SITE_URL)
}

// בפיתוח (npm run dev): index.html מקבל את הפרטים של דף הבית
const seoHtml = {
  name: 'seo-html',
  apply: 'serve',
  transformIndexHtml: (html) => fillSeo(html, '/'),
}

// בבנייה: dist/index.html יוצא עם %SEO_...% במקום הפרטים, וכאן ממלאים אותם.
// דף הבית נכתב ל-dist/index.html, ולכל עמוד ציבורי נוצר קובץ משלו (למשל dist/courses/index.html)
// עם הכותרת, התיאור ותגיות השיתוף שלו. הריאקט נטען בדיוק אותו דבר - רק התגיות שונות.
// ככה גוגל ווואטסאפ רואים לכל עמוד את התיאור הנכון, גם בלי להריץ JavaScript
const seoPages = {
  name: 'seo-pages',
  apply: 'build',
  closeBundle() {
    const dist = path.resolve('dist')
    const indexPath = path.join(dist, 'index.html')
    if (!fs.existsSync(indexPath)) return
    const template = fs.readFileSync(indexPath, 'utf8')
    fs.writeFileSync(indexPath, fillSeo(template, '/'))
    for (const page of PUBLIC_PAGES) {
      if (page === '/' || !PAGES[page]) continue
      const dir = path.join(dist, page)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(path.join(dir, 'index.html'), fillSeo(template, page))
    }
  },
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
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer(),
    seoHtml,
    seoFiles,
    seoPages,
  ],
})
