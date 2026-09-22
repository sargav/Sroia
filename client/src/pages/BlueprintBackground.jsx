/**
 * רקע בהיר בנושא בנייה: נייר שרטוט עם רשת עדינה,
 * חזית בית עם קווי מידה, ועגורן. הכול SVG, בלי תמונות, ובשקיפות נמוכה.
 *
 * שימוש: בתוך <section className="relative isolate overflow-hidden ..."> כילד ראשון,
 * והתוכן עם className="relative".
 */
export default function BlueprintBackground({ className = "" }) {
  const line = "#7E9D65";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#F4F1E8] [background-image:linear-gradient(rgba(126,157,101,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(126,157,101,.10)_1px,transparent_1px),linear-gradient(rgba(126,157,101,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(126,157,101,.05)_1px,transparent_1px)] [background-size:120px_120px,120px_120px,24px_24px,24px_24px] ${className}`}
    >
      {/* עגורן, למעלה בפינה */}
      <svg
        viewBox="0 0 220 320"
        className="absolute -top-2 left-2 hidden h-[300px] w-auto opacity-[.32] md:block"
        fill="none"
        stroke={line}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* מגדל */}
        <path d="M96 320V60M116 320V60" />
        <path d="M96 300l20-20M96 280l20-20M96 260l20-20M96 240l20-20M96 220l20-20M96 200l20-20M96 180l20-20M96 160l20-20M96 140l20-20M96 120l20-20M96 100l20-20M96 80l20-20" />
        {/* זרוע ראשית */}
        <path d="M10 60h200" />
        <path d="M10 60h200M20 60l86-40M106 20l96 40" />
        <path d="M106 20V6" />
        {/* משקולת נגד */}
        <rect x="170" y="60" width="26" height="18" />
        {/* וו */}
        <path d="M34 60v76" strokeDasharray="4 4" />
        <path d="M26 136h16v12H26z" />
      </svg>

      {/* חזית בית עם קווי מידה, למטה בפינה */}
      <svg
        viewBox="0 0 420 320"
        className="absolute -bottom-2 -right-6 w-[170px] opacity-[.22] sm:-right-4 sm:w-[250px] sm:opacity-[.30] md:w-[420px]"
        fill="none"
        stroke={line}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* קרקע */}
        <path d="M0 262h420" />
        <path d="M0 270h420" opacity=".5" strokeDasharray="6 6" />
        {/* קירות וגג */}
        <rect x="90" y="140" width="220" height="122" />
        <path d="M68 146L200 58l132 88z" />
        <path d="M250 84V52h22v46" />
        {/* דלת וחלונות */}
        <rect x="184" y="196" width="32" height="66" />
        <path d="M208 230h.01" />
        <rect x="112" y="170" width="46" height="38" />
        <path d="M135 170v38M112 189h46" />
        <rect x="242" y="170" width="46" height="38" />
        <path d="M265 170v38M242 189h46" />
        {/* קו אמצע */}
        <path d="M200 30v260" strokeDasharray="10 5 2 5" opacity=".7" />
        {/* קו מידה אופקי */}
        <path d="M90 292h220M90 284v16M310 284v16" />
        <path d="M98 288l-8 4 8 4M302 288l8 4-8 4" />
        {/* קו מידה אנכי */}
        <path d="M356 140v122M348 140h16M348 262h16" />
        <path d="M352 148l4-8 4 8M352 254l4 8 4-8" />
      </svg>

      {/* מסגרת כותרת שרטוט, למטה משמאל */}
      <div className="absolute bottom-6 left-6 hidden h-16 w-44 border border-[#7E9D65]/30 md:block">
        <div className="absolute left-0 top-1/2 h-px w-full bg-[#7E9D65]/30" />
        <div className="absolute left-1/3 top-0 h-full w-px bg-[#7E9D65]/30" />
      </div>
    </div>
  );
}
