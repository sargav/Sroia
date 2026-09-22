import React from 'react'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-neutral-800 mt-auto">

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-2">
          {/* רשתות חברתיות */}
          <div className="flex items-center gap-5">

            <a
              href="https://www.instagram.com/sroiaproject?igsh=bnZkbWxva3FrNXc0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-[rgb(141,196,62)] transition-colors"
            >
              <FaInstagram size={22} />
            </a>

            <a
              href="https://www.facebook.com/share/17V4qfkUeM/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-[rgb(141,196,62)] transition-colors"
            >
              <FaFacebookF size={22} />
            </a>

            <a
              href="https://wa.me/GGZb8N0x1941Hy1e2rCCtf?s=sh&p=a&ilr=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-gray-400 hover:text-[rgb(141,196,62)] transition-colors"
            >
              <FaWhatsapp size={22} />
            </a>

          </div></div>

        {/* <div className="flex flex-col md:flex-col items-center justify-between gap-6"> */}
        <div className="flex flex-col items-end justify-between gap-6 dir-rtl ">

          {/* קישורים בין העמודים */}
          <nav className="flex flex-wrap justify-center flex-col gap-6 items-end">
            <Link to="/" className="text-sm text-gray-400 hover:text-[rgb(141,196,62)] transition-colors" > דף הבית </Link>
            {/* <Link to="/about" className="text-sm text-gray-400 hover:text-[rgb(141,196,62)] transition-colors" > אודות</Link> */}
            <Link to="/projects" className="text-sm text-gray-400 hover:text-[rgb(141,196,62)] transition-colors" > ניהול פרויקטים </Link>
            <Link to="/courses" className="text-sm text-gray-400 hover:text-[rgb(141,196,62)] transition-colors" > קורס בית בשתי ידיים </Link>
            <Link to="/application" className="text-sm text-gray-400 hover:text-[rgb(141,196,62)] transition-colors" > המצפן לבונה-אפליקציה </Link>
            <Link to="/guid-to-builder" className="text-sm text-gray-400 hover:text-[rgb(141,196,62)] transition-colors" > המדריך לבונה </Link>
            <Link to="/benefit" className="text-sm text-gray-400 hover:text-[rgb(141,196,62)] transition-colors" > הטבות </Link>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-[rgb(141,196,62)] transition-colors" > צור קשר </Link>
          </nav>



        </div>

        {/* זכויות יוצרים */}
        <div className="mt-5 pt-4 border-t border-neutral-800 text-center text-xs text-gray-500">
          כל הזכויות שמורות לסרויה ניהול פרויקטים © {new Date().getFullYear()} || GreenCode בניה
        </div>

      </div>
    </footer>
  )
}

export default Footer

