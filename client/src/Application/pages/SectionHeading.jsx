import Reveal from "../components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  light = false,
  className = "",
}) {
  return (
    <Reveal>
      <header className={`mx-auto mb-12 max-w-3xl text-center md:mb-16 ${className}`}>
        {eyebrow && (
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-l from-[#8EAD70] to-transparent" />
            <span
              className={`text-xs font-black tracking-[0.18em] ${
                light ? "text-[#A9BE98]" : "text-[#78965D]"
              }`}
            >
              {eyebrow}
            </span>
            <span className="h-px w-10 bg-gradient-to-r from-[#8EAD70] to-transparent" />
          </div>
        )}

        <h2
          className={`${eyebrow ? "mt-6" : ""} text-4xl font-black leading-[1.2] md:text-5xl ${
            light ? "text-white" : "text-[#2D382B]"
          }`}
        >
          {title}
          {accent && (
            <span className={`mt-2 block ${light ? "text-[#A9BE98]" : "text-[#759855]"}`}>
              {accent}
            </span>
          )}
        </h2>

        {description && (
          <p
            className={`mx-auto mt-5 max-w-2xl text-base font-medium leading-8 md:text-lg ${
              light ? "text-white/65" : "text-[#6B7567]"
            }`}
          >
            {description}
          </p>
        )}
      </header>
    </Reveal>
  );
}
