function SectionHeading({ eyebrow, title, accent, description, light = false }) {
  return (
    <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      {eyebrow && (
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-primary/45" />
          <span className={`text-xs font-bold tracking-[0.16em] ${light ? "text-white/65" : "text-primary"}`}>
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-primary/45" />
        </div>
      )}
      <h2 className={`text-3xl font-black leading-[1.25] md:text-5xl ${light ? "text-white" : "text-ink"}`}>
        {title}
        {accent && <span className="mt-1 block text-primary">{accent}</span>}
      </h2>
      {description && (
        <p className={`mx-auto mt-5 max-w-2xl text-base font-medium leading-8 md:text-lg ${light ? "text-white/65" : "text-muted"}`}>
          {description}
        </p>
      )}
    </header>
  );
}

export default SectionHeading;
