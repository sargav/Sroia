import React, { Suspense } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      {/* קישור "דלג לתוכן": מוסתר עד שמגיעים אליו עם Tab */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-gray-900 focus:shadow-lg"
      >
        דלג לתוכן הראשי
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* עמודים שנטענים רק כשנכנסים אליהם: עד שהם מגיעים מוצג סימן טעינה, והתפריט והפוטר נשארים */}
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#8DC63F]/30 border-t-[#8DC63F]" aria-hidden="true" />
      <span className="sr-only">טוען...</span>
    </div>
  )
}
