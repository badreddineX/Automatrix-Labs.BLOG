interface LogoMarkProps {
  size?: number
  /** If true, the badge background is rendered (for use on light backgrounds) */
  badge?: boolean
}

export function LogoMark({ size = 36, badge = true }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AutoMatrix Labs"
    >
      {/* Dark rounded-square badge */}
      {badge && <rect width="40" height="40" rx="9" fill="#0F172A" />}

      {/* ── "A" letterform with circuit-node accents ── */}
      {/* Two diagonal legs */}
      <path
        d="M11 31 L20 9 L29 31"
        stroke="#0EA5E9"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crossbar */}
      <line
        x1="15"
        y1="23"
        x2="25"
        y2="23"
        stroke="#0EA5E9"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Circuit nodes */}
      {/* Apex — brightest */}
      <circle cx="20" cy="9" r="2.8" fill="#38BDF8" />
      {/* Crossbar ends */}
      <circle cx="15" cy="23" r="1.6" fill="#0EA5E9" opacity="0.6" />
      <circle cx="25" cy="23" r="1.6" fill="#0EA5E9" opacity="0.6" />
      {/* Foot nodes */}
      <circle cx="11" cy="31" r="1.4" fill="#0EA5E9" opacity="0.35" />
      <circle cx="29" cy="31" r="1.4" fill="#0EA5E9" opacity="0.35" />
    </svg>
  )
}
