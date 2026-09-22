import { useState } from "react";
import { Check, Palette, X } from "lucide-react";

const themes = [
  { id: "sage", label: "מרווה", color: "#7da255" },
  { id: "sand", label: "חול", color: "#b88a53" },
  { id: "charcoal", label: "כהה", color: "#27342a" },
  { id: "blueprint", label: "תכנית", color: "#39718c" },
  { id: "forest", label: "יער", color: "#52643f" },
  { id: "paper", label: "נייר", color: "#b66d3e" },
];

function ThemeSwitcher({ theme, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="fixed left-3 top-24 z-50 md:bottom-5 md:left-5 md:top-auto" aria-label="בחירת גרסת עיצוב">
      {open && (
        <div className="mb-3 w-[210px] rounded-3xl border border-line bg-surface/95 p-3 shadow-2xl backdrop-blur-xl md:w-[250px]">
          <p className="px-2 pb-2 text-xs font-black text-muted">בחירת סגנון</p>
          <div className="grid grid-cols-2 gap-1.5">
            {themes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                className={`flex items-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-bold transition ${theme === item.id ? "bg-ink text-white" : "text-muted hover:bg-soft"}`}
              >
                <span className="h-3 w-3 rounded-full ring-2 ring-white/70" style={{ backgroundColor: item.color }} />
                <span className="flex-1 text-right">{item.label}</span>
                {theme === item.id && <Check size={13} />}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface/95 text-primary shadow-xl backdrop-blur transition hover:-translate-y-0.5"
        title="בחירת סגנון עיצוב"
        aria-expanded={open}
      >
        {open ? <X size={19} /> : <Palette size={19} />}
      </button>
    </aside>
  );
}

export default ThemeSwitcher;
