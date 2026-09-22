const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold text-[15px] font-sans cursor-pointer transition whitespace-nowrap no-underline px-[26px] py-[13px]'

const BTN_VARIANTS = {
  primary: 'bg-brand text-[#182b0c] hover:bg-brandDark hover:text-white hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(141,198,63,0.35)]',
  outline: 'bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-cream',
  outlineWhite: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-ink',
  dark: 'bg-ink text-cream hover:bg-black',
  ghost: 'bg-transparent text-ink !px-0 !py-2 rounded-none hover:text-brandDark hover:underline',
}

export default function Btn({ variant = 'primary', href, onClick, children, className = '' }) {
  const classes = `${BTN_BASE} ${BTN_VARIANTS[variant]} ${className}`
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
