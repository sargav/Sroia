import { YEARS_OF_EXPERIENCE } from "../utils/experience";
import ExperienceYearsBadge from "./ExperienceYearsBadge";
// src/components/AboutAsaf.jsx
import asafPhoto from '../GuideBuilder/assets/asaf-arms-crossed.webp';
import asafBgPhoto from '../GuideBuilder/assets/asaf-about-bg.jpg';
import statFamilies from '../GuideBuilder/assets/stat-100families.png';
import statMillions from '../GuideBuilder/assets/stat-millions.png';

const GREEN_TEXT = "#51762b"; // גוון כהה יותר לטקסט, כדי שיהיה קריא (ניגודיות 4.5 לפחות)

const AboutAsaf = () => {
  return (
    <section
      className="relative px-6 py-6"
      style={{
        backgroundImage: `url(${asafBgPhoto})`,
        backgroundSize: "160%",
        backgroundPosition: "center 15%",
        backgroundRepeat: "no-repeat",
        overflow: "visible",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%)" }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="relative mb-3" style={{ marginTop: "-90px", zIndex: 6 }}>
          <div
            className="flex h-56 w-56 items-center justify-center rounded-full sm:h-64 sm:w-64"
            style={{ backgroundColor: "#d7e6b8" }}
          >
            <img
              src={asafPhoto}
              alt="אסף סרויה"
              className="h-full w-full object-contain object-bottom"
            />
          </div>
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl px-6 py-2 text-lg font-bold text-white"
            style={{ backgroundColor: "#1f1f1f" }}
          >
            נעים להכיר
          </div>
        </div>

        <p className="mb-2 text-2xl font-bold text-neutral-800">
          נעים מאוד, אני אסף סרויה
        </p>

        <div className="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ExperienceYearsBadge />
          <img src={statFamilies} alt="100+ משפחות" className="mx-auto h-24 w-auto" />
          <img src={statMillions} alt="מיליוני שקלים שנחסכו" className="mx-auto h-24 w-auto" />
        </div>

        <p className="max-w-xl text-lg leading-snug text-neutral-700">
          ב-{YEARS_OF_EXPERIENCE} השנים האחרונות ליוויתי מעל 100 משפחות בבניית הבית שלהן.
          <br />
          <br />
          המדריך שאתם מקבלים עכשיו הוא בדיוק הדברים שאני מעביר למשפחות
          שמרוויחות תהליך בנייה{" "}
          <span className="font-bold" style={{ color: GREEN_TEXT }}>
            רגוע, מדויק וחסכוני.
          </span>
        </p>
      </div>
    </section>
  );
};

export default AboutAsaf;