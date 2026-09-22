const icons = {
  commitment: (
    <>
      <path d="M12 3 5 6v5c0 4.6 2.8 8.3 7 10 4.2-1.7 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),

  experience: (
    <>
      <path d="M4 20h16" />
      <path d="M6 20v-8h12v8" />
      <path d="M8 12V8a4 4 0 0 1 8 0v4" />
      <path d="M12 4v8" />
    </>
  ),

  budget: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M16 10h5v5h-5a2.5 2.5 0 0 1 0-5Z" />
      <path d="M7 6V4h10v2" />
    </>
  ),

  management: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2h6v2" />
      <path d="m8 11 2 2 5-5" />
      <path d="M8 17h8" />
    </>
  ),

  course: (
    <>
      <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23.5Z" />
      <path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5a3.5 3.5 0 0 1 3.5 3.5Z" />
    </>
  ),

  application: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M10 5h4" />
      <path d="M10 18h4" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
}

export default function AnimatedIcon({
  type,
  size = 76,
  className = '',
}) {
  return (
    <div
      className={`animated-icon ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="animated-icon__ring animated-icon__ring--outer" />
      <span className="animated-icon__ring animated-icon__ring--inner" />

      <svg
        viewBox="0 0 24 24"
        className="animated-icon__svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[type]}
      </svg>
    </div>
  )
}