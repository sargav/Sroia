import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import '../App.css'
import logowhite from '../images/logowhite.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const links = [
    { to: '/', label: 'דף הבית' },
    // { to: '/about', label: 'אודותינו' },
    { to: '/projects', label: 'ניהול פרויקטים' },
    { to: '/courses', label: 'קורס בית בשתי ידיים' },
    { to: '/application', label: 'המצפן לבונה-אפליקציה' },
    { to: '/guid-to-builder', label: 'המדריך לבונה' },
    { to: '/benefit', label: 'הטבות' },
    { to: '/contact', label: 'צור קשר' }
  ]

  // סגירת התפריט בלחיצה מחוץ אליו
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <header className="relative bg-gray-900 text-white px-6 md:px-10 border-b border-neutral-800">

      {/* Header */}
      <div className="relative max-w-7xl mx-auto h-28 flex items-center justify-between">

        {/* צד שמאל - המבורגר */}
        <div className="relative z-20">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-[rgb(141,196,62)] p-2 transition-colors duration-200"
            aria-label="תפריט"
          >
            {isOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* תפריט */}
          {isOpen && (
            <nav
              ref={menuRef}
              dir="rtl"
              className="absolute top-14 left-0 w-64 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-800 shadow-2xl z-50 p-4"
            >
              <ul className="flex flex-col gap-2">

                {links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-right transition-all duration-200 ${isActive
                          ? 'text-[rgb(141,196,62)] font-bold bg-gray-800/60'
                          : 'text-gray-300 hover:text-[rgb(141,196,62)] hover:bg-gray-800/40'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}

              </ul>
            </nav>
          )}
        </div>


        {/* אמצע - לוגו */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <NavLink to="/">
            <img
              src={logowhite}
              alt="סרויה ניהול פרויקטים"
              className="h-28 md:h-32 w-auto object-contain"
            />
          </NavLink>
        </div>


        {/* צד ימין - רשתות חברתיות */}
        <div className="flex items-center gap-4 z-20">

          {/* Instagram */}
          <a
            href="https://www.instagram.com/sroiaproject?igsh=bnZkbWxva3FrNXc0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-[rgb(141,196,62)] transition-colors"
          >
            <FaInstagram size={22} />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/17V4qfkUeM/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-[rgb(141,196,62)] transition-colors"
          >
            <FaFacebookF size={22} />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/GGZb8N0x1941Hy1e2rCCtf?s=sh&p=a&ilr=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-gray-400 hover:text-[rgb(141,196,62)] transition-colors"
          >
            <FaWhatsapp size={22} />
          </a>

        </div>

      </div>

    </header>
  )
}

export default Header
