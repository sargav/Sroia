import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { to: '/', label: 'דף הבית' },
    { to: '/about-us', label: 'עלינו' },
    { to: '/curses', label: 'קורס בית בשתי ידיים' },
    { to: '/aplication', label: 'המצפן לבונה-אפליקציה' },
    { to: '/guid-to-cuilder', label: 'המדריך לבונה' },
    { to: '/testimonial', label: 'הטבות' },
    { to: '/contact', label: 'צור קשר' },
  ]

  return (
    <nav className="relative z-50">
      {/* כפתור המבורגר - מופיע רק בניידים (מתחת ל-md) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-200 hover:text-white p-2 focus:outline-none transition-colors duration-200 cursor-pointer"
        aria-label="תפריט"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* רשימת הקישורים */}
      <ul
        className={`
          list-none m-0 tracking-wide transition-all duration-300
          
          /* במחשב: תפריט אופקי גמיש שמתאים את עצמו דינמית לכל מסך */
          md:flex md:flex-row-reverse md:items-center md:gap-1 lg:gap-3 xl:gap-5 md:static md:bg-transparent md:p-0 md:w-auto md:shadow-none
          
          /* הדרגתיות בגודל הטקסט - מונעת חיתוך בכל גודל חלון */
          text-[0.78rem] lg:text-[0.92rem] xl:text-[1.05rem] font-medium
          
          /* בנייד: תפריט המבורגר בצד שמאל */
          ${isOpen 
            ? 'flex flex-col gap-4 fixed top-24 left-4 w-64 bg-gray-900/95 backdrop-blur-md p-6 rounded-2xl border border-gray-800/80 shadow-2xl z-50 text-right items-end' 
            : 'hidden'
          }
        `}
      >
        {links.map((link) => (
          <li key={link.to} className="w-full md:w-auto text-right">
            <NavLink
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `whitespace-nowrap block px-1.5 lg:px-2.5 py-1.5 rounded-lg text-right transition-all duration-200 ${
                  isActive
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
  )
}

export default Menu