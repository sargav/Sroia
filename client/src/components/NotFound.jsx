import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";

// עמוד שמוצג כשנכנסים לכתובת שלא קיימת באתר
export default function NotFound() {
  return (
    <PageTitle title="העמוד לא נמצא">
      <section
        dir="rtl"
        className="flex min-h-[70vh] items-center justify-center bg-[#FAFCF7] px-6 py-16 font-['Heebo',sans-serif]"
      >
        <div className="mx-auto max-w-[560px] text-center">
          <p
            className="mb-2 text-[5.5rem] font-black leading-none tracking-tight text-[#7CB342]/25 md:text-[7rem]"
            aria-hidden="true"
          >
            404
          </p>

          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-l from-[#8EAD70] to-transparent" aria-hidden="true" />
            <span className="text-[0.8125rem] font-black tracking-[0.16em] text-[#5f774a]">
              העמוד לא נמצא
            </span>
            <span className="h-px w-10 bg-gradient-to-r from-[#8EAD70] to-transparent" aria-hidden="true" />
          </div>

          <h1 className="text-[2rem] font-black leading-[1.25] text-[#31382D] md:text-[2.75rem]">
            נראה שהגעתם לקיר
            <span className="block text-[#77965c]">בלי דלת</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[440px] text-[1.0625rem] font-medium leading-[1.8] text-[#667061]">
            הכתובת שחיפשתם לא קיימת או שהעמוד הועבר. אפשר לחזור לדף הבית,
            או לדבר איתנו ישירות.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-[#4d7a22] px-7 py-3 font-bold text-white transition hover:bg-[#3f661b] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#7CB342]/40"
            >
              חזרה לדף הבית
            </Link>
            <Link
              to="/contact"
              className="rounded-full border-2 border-[#7CB342] px-7 py-[0.625rem] font-bold text-[#4d7a22] transition hover:bg-[#7CB342]/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#7CB342]/40"
            >
              צרו קשר
            </Link>
          </div>
        </div>
      </section>
    </PageTitle>
  );
}
