import { YEARS_OF_EXPERIENCE } from "../utils/experience";

// מחליף את התמונה stat-15years.png, כך שהמספר מתעדכן אוטומטית כל שנה.
export default function ExperienceYearsBadge({ className = "" }) {
  return (
    <div
      className={`mx-auto flex h-24 flex-col items-center justify-center leading-none text-[#7CB342] ${className}`}
      role="img"
      aria-label={`${YEARS_OF_EXPERIENCE} שנות ניסיון`}
    >
      <span className="text-[56px] font-black tracking-tight" aria-hidden="true">
        {YEARS_OF_EXPERIENCE}
      </span>
      <span className="mt-1 text-[22px] font-extrabold" aria-hidden="true">
        שנות ניסיון
      </span>
    </div>
  );
}
