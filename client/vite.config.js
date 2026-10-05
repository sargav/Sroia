import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { YEARS_OF_EXPERIENCE } from './src/utils/experience.js'

// מכניס את מספר שנות הניסיון לתיאור שגוגל מציג, כך שהוא מתעדכן בכל העלאה של האתר
const injectYearsOfExperience = {
  name: 'inject-years-of-experience',
  transformIndexHtml: (html) => html.replaceAll('%YEARS_OF_EXPERIENCE%', String(YEARS_OF_EXPERIENCE)),
}

export default defineConfig({
  base: '/Sroia/',
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer(),
    injectYearsOfExperience,
  ],
})