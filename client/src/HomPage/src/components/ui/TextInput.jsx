export default function TextInput({ type = 'text', placeholder, pill = true, className = '' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        ${pill ? 'flex-1 min-w-[160px] rounded-full px-4 py-[13px] text-[14.5px]' : 'w-full rounded-[10px] px-4 py-[14px] text-[15px]'}
        font-sans bg-cream border-[1.5px] border-ink/10 outline-none
        focus:border-brand
        ${className}
      `}
    />
  )
}
