import { useState } from "react";
import { Check, LayoutTemplate, X } from "lucide-react";

const designs = [
  { id: "studio", label: "סטודיו", description: "מאוזן ונקי" },
  { id: "editorial", label: "מגזין", description: "טיפוגרפי ופתוח" },
  { id: "architect", label: "אדריכלי", description: "מדויק ומודולרי" },
  { id: "journey", label: "מסלול", description: "זורם וסיפורי" },
  { id: "mosaic", label: "פסיפס", description: "מדורג ודינמי" },
  { id: "minimal", label: "מינימל", description: "שקט ומרווח" },
];

function DesignSwitcher({ design, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="fixed right-3 top-24 z-50 md:bottom-5 md:right-5 md:top-auto" aria-label="בחירת מבנה עיצוב">
      {open && (
        <div className="mb-3 w-[230px] rounded-3xl border border-line bg-surface/95 p-3 shadow-2xl backdrop-blur-xl">
          <p className="px-2 pb-2 text-xs font-black text-muted">עיצובים מלאים</p>
          <div className="space-y-1.5">
            {designs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-right transition ${design === item.id ? "bg-ink text-white" : "hover:bg-soft"}`}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-xl ${design === item.id ? "bg-white/10" : "bg-soft text-primary"}`}>
                  {design === item.id ? <Check size={15} /> : <LayoutTemplate size={15} />}
                </span>
                <span>
                  <span className="block text-xs font-black">{item.label}</span>
                  <span className={`block text-[10px] ${design === item.id ? "text-white/55" : "text-muted"}`}>{item.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink text-white shadow-xl transition hover:-translate-y-0.5"
        title="בחירת עיצוב מלא"
        aria-expanded={open}
      >
        {open ? <X size={19} /> : <LayoutTemplate size={19} />}
      </button>
    </aside>
  );
}

export default DesignSwitcher;
