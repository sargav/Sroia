export function BrandMark({ size = 34, ringColor = '#242320', paneColor = '#89C03D', strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="21" stroke={ringColor} strokeWidth={strokeWidth} />
      <polygon points="19,24 12,17.5 12,30.5" fill={paneColor} />
      <rect x="21" y="16" width="6" height="6" fill={paneColor} />
      <rect x="28" y="16" width="6" height="6" fill={paneColor} />
      <rect x="21" y="23" width="6" height="6" fill={paneColor} />
      <rect x="28" y="23" width="6" height="6" fill={paneColor} />
    </svg>
  )
}

export function GuideIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="14" height="18" rx="2" stroke="#E9E6D6" strokeWidth="1.6" />
      <line x1="7.5" y1="8" x2="14.5" y2="8" stroke="#89C03D" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7.5" y1="12" x2="14.5" y2="12" stroke="#89C03D" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7.5" y1="16" x2="12" y2="16" stroke="#89C03D" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.2 0-2.4-.3-3.4-.8L4 20l1-4.4C4.4 14.4 4 13.2 4 12Z"
        stroke="#E9E6D6"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="12" r="1.1" fill="#89C03D" />
      <circle cx="12" cy="12" r="1.1" fill="#89C03D" />
      <circle cx="15.5" cy="12" r="1.1" fill="#89C03D" />
    </svg>
  )
}

export function ArrowIcon({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
