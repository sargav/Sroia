import { useEffect } from "react";
import { ArrowLeft, Compass, Quote } from "lucide-react";
import HomeBuildingIntro from "./HomeBuildingIntro";
import MistakesCompass from "./MistakesCompass";
import JoinSteps from "./JoinSteps";
import FaqSection from "./CompassFaq"
import PersonalNote from "./PersonalNote";
import ImagineSection from "./ImagineSection"
import PricingSection from "./PricingSection";
import HeroSection from "./HeroSection";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import logo from "../assets/logo.svg";
import screen1 from "../assets/images/screen1.webp";
import screen2 from "../assets/images/screen2.jpeg";
import screen3 from "../assets/images/screen3.webp";
import module1Icon from "../assets/icons/module1-initiation.png";
import module2Icon from "../assets/icons/module2-planning.png";
import module3Icon from "../assets/icons/module3-structure.png";
import module4Icon from "../assets/icons/module4-finishing.png";
import module5Icon from "../assets/icons/module5-occupancy.png";
import glossaryIcon from "../assets/icons/bonus-glossary.webp";
import procurementIcon from "../assets/icons/bonus-procurement.webp";
import kitchenIcon from "../assets/icons/bonus-kitchen.webp";
import testimonialsBackground from "../assets/backgrounds/testimonials-architectural.webp";
import pricingPhoto from "../assets/backgrounds/pricing-photo.webp";
import useSiteStats, { formatPrice } from "../../utils/useSiteStats";


const mistakes = [
  ["להניח שמישהו אחר כבר חשב על הכול", "כל בעל מקצוע רואה חלק אחר בתמונה. בלי רשימה אחת מסודרת, דברים חשובים נופלים בין הכיסאות."],
  ["לקבל החלטות מהר מדי בתכנון", "שינוי על הנייר כמעט לא עולה כסף. אותו שינוי אחרי הביצוע עלול להיות יקר ומורכב."],
  ["לא להבין את השפה המקצועית", "כשלא מבינים את המושגים, קשה לשאול את השאלות הנכונות ולקבל החלטה בביטחון."],
  ["לא לדעת מה לבדוק בכל שלב", "לכל שלב יש אישורים, בדיקות ותיאומים שחשוב להשלים לפני שממשיכים."],
  ["לגלות דברים אחרי שסגרו את הקיר", "נקודות חשמל, הכנות, איטום ותשתיות — הרבה יותר קל לבדוק בזמן מאשר לתקן אחר כך."],
  ["לא לנהל רכש ולוחות זמנים", "הזמנה מוקדמת מדי תופסת מקום וכסף; הזמנה מאוחרת עלולה לעצור את ההתקדמות."],
  ["לנסות לזכור הכול לבד", "תהליך מורכב צריך שיטה. המצפן מרכז את הדברים החשובים ומחזיר תחושת שליטה."],
];

const modules = [
  { icon: module1Icon, title: "יזום", count: "4 פרקים", text: "בחירת מגרש, זכויות בנייה, בדיקות קרקע וטאבו — הדברים שחייבים לדעת לפני שמתחילים." },
  { icon: module2Icon, title: "תכנון", count: "6 פרקים", text: "בחירת יועצים, שיטות עבודה, רישוי והחלטות שמשפיעות על כל המשך הפרויקט." },
  { icon: module3Icon, title: "שלד", count: "13 פרקים", text: "חשמל, אינסטלציה, איטום ובטון. השלב שבו בדיקה בזמן חוסכת תיקון יקר בהמשך.", featured: true },
  { icon: module4Icon, title: "גמרים", count: "7 פרקים", text: "ריצוף, טיח, צבע, אלומיניום ומטבח — בדיקות איכות וסדר עבודה נכון." },
  { icon: module5Icon, title: "אכלוס", count: "4 פרקים", text: "כל האישורים והבדיקות האחרונות עד לקבלת המפתח והכניסה לבית." },
];

const bonuses = [
  { icon: glossaryIcon, title: "מילון המושגים המלא", value: "97 ₪", text: "מושגים מקצועיים מוסברים בעברית פשוטה, כדי שתבינו כל שיחה וכל מסמך." },
  { icon: procurementIcon, title: "לוח הרכש החכם", value: "147 ₪", text: "מתי להזמין כל מוצר וספק כדי למנוע עיכובים, אחסון מיותר ועלויות כפולות." },
  { icon: kitchenIcon, title: "פרק המטבח המיוחד", value: "197 ₪", text: "כל מה שצריך לסגור בתשתיות ובתכנון לפני שהמטבח מגיע לשטח." },
];

const testimonials = [
  ["פתחתי את המצפן לפני פגישה, ותוך כמה דקות ידעתי בדיוק מה לאשר ומה לשאול. כל השיחה נראתה אחרת.", "מירי", "שלב התכנון"],
  ["חשבתי שאני מסודר, ואז גיליתי כמה פרטים עדיין פתוחים. היום אני מגיע לכל פגישה עם רשימה ברורה.", "יורם", "שלב התכנון"],
  ["לפני כל ביקור אנחנו פותחים את הרשימה הרלוונטית ומסמנים מה נבדק. זה הכניס סדר אמיתי לתהליך.", "דנה", "שלב השלד"],
];

// השאלות הנפוצות. המחיר מגיע מפאנל הניהול
const makeFaqs = (price) => [
  ["האם צריך ידע קודם בבנייה?", "לא. המצפן נכתב בשפה פשוטה ומסודרת, גם למי שאינו מגיע מהתחום."],
  ["האם זה מתאים גם לשיפוץ מקיף?", "כן. הוא מתאים גם לתהליך מקיף הכולל תכנון, תשתיות, ביצוע וגמרים."],
  ["האם זה מחליף מנהל פרויקט?", "לא. המצפן נותן לכם ידע, סדר ושאלות נכונות כדי לעבוד טוב יותר מול כל אנשי המקצוע."],
  ["באיזה שלב כדאי להצטרף?", "ככל שמצטרפים מוקדם יותר אפשר למנוע יותר טעויות, אבל אפשר להתחיל גם באמצע התהליך ולדלג ישר לשלב הרלוונטי."],
  [`האם המחיר יישאר ${price} ₪?`, "זהו מחיר השקה לתקופה מוגבלת. לאחר מכן המחיר צפוי להתעדכן."],
];

/* האנימציה של המצפן (הגופן Heebo נטען לכל האתר ב-index.html), כדי שלא יהיה צורך לגעת ב-CSS של האתר הראשי */
function PageStyles() {
  return (
    <style>{`@keyframes compass-spin{to{transform:rotate(360deg)}}`}</style>
  );
}

function scrollToPricing() {
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function CTAButton({ children = "אני רוצה את המצפן לבונה", className = "" }) {
  return (
    <button
      type="button"
      onClick={scrollToPricing}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#5A7F43] px-7 py-3.5 text-base font-black text-white shadow-[0_14px_35px_rgba(90,127,67,.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#4F7239] hover:shadow-[0_18px_40px_rgba(90,127,67,.36)] md:px-9 md:py-4 md:text-lg ${className}`}
    >
      {children}
      <ArrowLeft size={19} className="transition group-hover:-translate-x-1" />
    </button>
  );
}

// טלפון שנראה אמיתי: מסגרת מתכת עם כפתורים בצדדים, שורת סטטוס עם שעה וסוללה,
// "אי" שחור למעלה (שלא מסתיר את המסך), פס בית למטה וברק עדין על הזכוכית.
// כל הגדלים בתוך המסך יחסיים לרוחב הטלפון (cqw), כך שהוא נראה אותו דבר בכל גודל.
function PhoneMockup({ src, alt, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* כפתורי הצד */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[18%] h-[6%] w-[3px] rounded-l-sm bg-[#2b302c]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[26%] h-[9%] w-[3px] rounded-l-sm bg-[#2b302c]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[37%] h-[9%] w-[3px] rounded-l-sm bg-[#2b302c]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[28%] h-[13%] w-[3px] rounded-r-sm bg-[#2b302c]" />

      {/* המסגרת */}
      <div className="rounded-[14%/6.5%] bg-[linear-gradient(145deg,#3b413c,#151916_45%,#262b27)] p-[3.2%] shadow-[0_2px_0_1px_#454c46_inset,0_30px_60px_-12px_rgba(20,30,22,.45),0_12px_24px_-8px_rgba(20,30,22,.3)]">
        <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[11%/5.2%] bg-white [container-type:inline-size]">
          {/* שורת הסטטוס */}
          <div dir="ltr" aria-hidden="true" className="relative flex h-[7%] flex-none items-center justify-between bg-white px-[7cqw] text-[4.6cqw] font-semibold text-[#111]">
            <span>9:41</span>
            <span className="absolute left-1/2 top-[28%] h-[52%] w-[30cqw] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-[1.4cqw]">
              {/* קליטה */}
              <svg viewBox="0 0 18 12" className="h-[3.4cqw] w-auto fill-current"><rect x="0" y="8" width="3" height="4" rx=".8" /><rect x="5" y="5.5" width="3" height="6.5" rx=".8" /><rect x="10" y="3" width="3" height="9" rx=".8" /><rect x="15" y="0" width="3" height="12" rx=".8" /></svg>
              {/* וייפיי */}
              <svg viewBox="0 0 16 12" className="h-[3.4cqw] w-auto fill-current"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.4 10.4 0 0 0 8 .2C5.2.2 2.6 1.3.7 3.2L2 4.6a8.4 8.4 0 0 1 6-2.4Zm0 3.6c1.4 0 2.6.5 3.5 1.4l1.4-1.4A6.9 6.9 0 0 0 8 3.8c-1.9 0-3.6.7-4.9 2l1.4 1.4A5 5 0 0 1 8 5.8Zm0 3.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Z" /></svg>
              {/* סוללה */}
              <svg viewBox="0 0 27 12" className="h-[3.4cqw] w-auto"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor" /><rect x="24" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".4" /></svg>
            </span>
          </div>

          {/* צילום המסך מהאפליקציה */}
          <img src={src} alt={alt} loading="lazy" className="min-h-0 w-full flex-1 object-cover object-top" />

          {/* פס הבית */}
          <span aria-hidden="true" className="absolute bottom-[1.4%] left-1/2 h-[0.6%] w-[34cqw] -translate-x-1/2 rounded-full bg-black/80" />
          {/* ברק עדין על הזכוכית */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.18)_0%,rgba(255,255,255,0)_32%,rgba(255,255,255,0)_70%,rgba(255,255,255,.06)_100%)]" />
        </div>
      </div>
    </div>
  );
}

function CompassPage() {
  const { compassPrice } = useSiteStats();
  // כשמגיעים עם #pricing בכתובת (למשל מכפתור "לנסות שוב" בדף התוצאה), גוללים ישר לטופס התשלום
  useEffect(() => {
    if (window.location.hash !== "#pricing") return undefined;
    const timer = setTimeout(scrollToPricing, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div dir="rtl" className="min-h-screen overflow-hidden bg-[#F6F5EF] font-['Heebo',sans-serif] text-[#2E3423]">
      <PageStyles />
      <HeroSection/>
      <HomeBuildingIntro />
      {/*7 הטעויות  */}
      <MistakesCompass mistakes={mistakes} />

      <ImagineSection cta={<CTAButton className="mt-7">אני רוצה לראות מה בפנים</CTAButton>} />

      <section id="modules" className="py-20 md:py-28 bg-[#F6F5EF]">
        <div className="mx-auto w-full px-5 md:px-10 max-w-7xl">
          <SectionHeading eyebrow="תוכן המצפן" title="חמישה מודולים." accent="מסלול אחד מסודר." description="אפשר להתחיל מהשלב שבו אתם נמצאים ולהתקדם בקצב שלכם." />
          <div className="grid gap-5 lg:grid-cols-5">
            {modules.map((item, index) => (
              <Reveal key={item.title} delay={index * 70} className={item.featured ? "lg:-translate-y-4" : ""}>
                <article className={`relative h-full overflow-hidden rounded-[2rem] border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${item.featured ? "border-[#697949] bg-[#232A19] text-white shadow-xl" : "border-[#CACFB9] bg-[#FBFBF8]"}`}>
                  {/* מספר קישוטי ברקע: מוצג דרך CSS כדי שלא ייחשב טקסט (לא נקרא ולא נבדק לניגודיות) */}
                  <span aria-hidden="true" data-n={`0${index + 1}`} className={`absolute left-3 top-1 text-7xl font-black before:content-[attr(data-n)] ${item.featured ? "text-white/[.05]" : "text-[#697949]/[.06]"}`} />
                  <img src={item.icon} alt="" className="relative h-16 w-16 object-contain" />
                  <div className="relative mt-6">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.featured ? "bg-white/10 text-[#c6e3a0]" : "bg-[#E2E6D6] text-[#5c6a40]"}`}>{item.count}</span>
                    <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
                    <p className={`mt-3 text-sm font-medium leading-7 ${item.featured ? "text-white/65" : "text-[#6B705C]"}`}>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 overflow-hidden bg-[#FBFBF8]">
        <div className="mx-auto w-full px-5 md:px-10 max-w-7xl">
          <SectionHeading eyebrow="כך זה נראה" title="המצפן הולך איתכם" accent="ישר מהטלפון" description="שלושה מסכים, מאות החלטות, מקום אחד מסודר." />
          <div className="relative flex items-end justify-center gap-3 px-2 pb-6 sm:gap-6 md:gap-10">
            {/* צל רך על "הרצפה" מתחת לטלפונים */}
            <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-10 w-[80%] max-w-[46rem] -translate-x-1/2 rounded-[50%] bg-[#1f2b22]/15 blur-2xl" />
            <PhoneMockup src={screen3} alt="מסך מודולים" className="w-[27%] max-w-[13.75rem] translate-y-8 -rotate-3" />
            <PhoneMockup src={screen2} alt="מסך רשימת משימות" className="z-10 w-[31%] max-w-[15.625rem]" />
            <PhoneMockup src={screen1} alt="מסך מילון מושגים" className="w-[27%] max-w-[13.75rem] translate-y-8 rotate-3" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F6F5EF]">
        <div className="mx-auto w-full px-5 md:px-10 max-w-7xl">
          <SectionHeading eyebrow="מצטרפים ומקבלים" title="שלושה בונוסים" accent="שחוסכים זמן והתלבטויות" />
          <div className="grid gap-5 md:grid-cols-3">
            {bonuses.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <article className="relative overflow-hidden rounded-[1.25rem] border border-[#CACFB9] bg-[#FBFBF8] shadow-[0_14px_40px_rgba(50,65,43,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#697949]/40 hover:shadow-[0_20px_55px_rgba(50,65,43,.12)] group h-full p-7 text-center">
                  <img src={item.icon} alt="" className="mx-auto h-36 w-36 object-contain transition duration-500 group-hover:scale-105" />
                  <span className="mt-4 inline-block rounded-full bg-[#E2E6D6] px-3 py-1 text-xs font-bold text-[#5c6a40]">בונוס #{index + 1}</span>
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-[#6B705C]">{item.text}</p>
                  <p className="mt-5 text-sm font-bold text-[#6B705C] line-through">שווי {item.value}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="md:bg-fixed py-20 md:py-28 relative isolate overflow-hidden bg-[#232A19] bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${testimonialsBackground})` }}
      >
        <div className="absolute inset-0 -z-10 bg-[#232A19]/55" />
        <div className="mx-auto w-full px-5 md:px-10 max-w-7xl relative">
          <SectionHeading eyebrow="משתתפים מספרים" title="יותר סדר." accent="יותר ביטחון בדרך." light />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map(([quote, name, stage], index) => (
              <Reveal key={name} delay={index * 90}>
                <figure className="after:absolute after:-bottom-[19px] after:left-7 after:h-7 after:w-[2.125rem] after:bg-[#334235] after:content-[''] after:[clip-path:polygon(0_0,100%_0,0_100%)] relative h-full rounded-[2rem] border border-white/10 bg-[#334235]/90 p-7 shadow-[0_22px_55px_rgba(7,16,9,.20)] backdrop-blur-md">
                  <Quote size={32} className="text-[#b7da86]" />
                  <blockquote className="mt-6 text-base font-medium leading-8 text-white/78">“{quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-black">{name}</p>
                    <p className="mt-1 text-sm text-white/45">{stage}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={makeFaqs(formatPrice(compassPrice))} />

      <JoinSteps />

      <PricingSection photo={pricingPhoto}/>



      {/*מילה לסיום */}
      <PersonalNote/>

      {/*הסוף  */}
<section className="relative overflow-hidden bg-[#232A19] px-5 py-10 text-center text-white md:py-14">
  <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_50%_0%,rgba(158,193,114,.6),transparent_45%)]" />
  <Reveal className="relative mx-auto max-w-2xl">
    <Compass size={36} className="mx-auto animate-[compass-spin_8s_linear_infinite] text-[#b7da86]" />
    <h2 className="mt-4 text-2xl font-black leading-tight md:text-4xl">נכנסים לתהליך עם מצפן.</h2>
    <p className="mx-auto mt-3 max-w-xl text-base font-medium leading-7 text-white/65 md:text-lg">
      עושים סדר, מבינים מה לבדוק ומתקדמים שלב אחר שלב.
    </p>
    <CTAButton className="mt-5">אני רוצה את המצפן לבונה</CTAButton>
  </Reveal>
</section>
      <footer className="bg-[#111811] px-5 py-8 text-white/55">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm md:flex-row md:text-right">
          <img src={logo} alt="לוגו בית בשתי ידיים" className="h-10 w-auto brightness-0 invert opacity-80" />
          <p>© בית בשתי ידיים | אסף סרויה</p>
          <a href="mailto:baitb2yadayim@gmail.com" className="transition hover:text-white">baitb2yadayim@gmail.com</a>
        </div>
      </footer>

    </div>
  );
}

export default CompassPage;
