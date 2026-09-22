import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Compass,
  HardHat,
  KeyRound,
  Mail,
  MapPinned,
  Menu,
  Quote,
  MonitorSmartphone,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import HomeBuildingIntro from "./HomeBuildingIntro";
import MistakesCompass from "./MistakesCompass";
import JoinSteps from "./JoinSteps";
import FaqSection from "./FaqSection"
import ClearListSection from "./ClearListSection";
import PersonalNote from "./PersonalNote";
import ImagineSection from "./ImagineSection"
import PricingSection from "./PricingSection";
import HeroSection from "./HeroSection";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import logo from "../assets/logo.svg";
import asafPhoto from "../assets/images/asaf-photo.jpg";
import asafPersonal from "../assets/images/asaf-personal.jpg";
import screen1 from "../assets/images/screen1.jpeg";
import screen2 from "../assets/images/screen2.jpeg";
import screen3 from "../assets/images/screen3.jpeg";
import module1Icon from "../assets/icons/module1-initiation.png";
import module2Icon from "../assets/icons/module2-planning.png";
import module3Icon from "../assets/icons/module3-structure.png";
import module4Icon from "../assets/icons/module4-finishing.png";
import module5Icon from "../assets/icons/module5-occupancy.png";
import glossaryIcon from "../assets/icons/bonus-glossary.png";
import procurementIcon from "../assets/icons/bonus-procurement.png";
import kitchenIcon from "../assets/icons/bonus-kitchen.png";
import testimonialsBackground from "../assets/backgrounds/testimonials-architectural.png";
import heroModelV2 from "../assets/images/hero-mosaic-v2.png";
import pricingPhoto from "../assets/backgrounds/pricing-photo.jpg";


const PAYMENT_BASE = "https://secure.cardcom.solutions/EA/EA5/aZoY90GJgke3fTZVlqxFnQ/PaymentSP";
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

const faqs = [
  ["האם צריך ידע קודם בבנייה?", "לא. המצפן נכתב בשפה פשוטה ומסודרת, גם למי שאינו מגיע מהתחום."],
  ["האם זה מתאים גם לשיפוץ מקיף?", "כן. הוא מתאים גם לתהליך מקיף הכולל תכנון, תשתיות, ביצוע וגמרים."],
  ["האם זה מחליף מנהל פרויקט?", "לא. המצפן נותן לכם ידע, סדר ושאלות נכונות כדי לעבוד טוב יותר מול כל אנשי המקצוע."],
  ["באיזה שלב כדאי להצטרף?", "ככל שמצטרפים מוקדם יותר אפשר למנוע יותר טעויות, אבל אפשר להתחיל גם באמצע התהליך ולדלג ישר לשלב הרלוונטי."],
  ["האם המחיר יישאר 297 ₪?", "זהו מחיר השקה לתקופה מוגבלת. לאחר מכן המחיר צפוי להתעדכן."],
];

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

function PhoneMockup({ src, alt, className = "" }) {
  return (
    <div className={`relative rounded-[2.5rem] bg-[#171b18] p-[6px] shadow-[0_25px_70px_rgba(31,43,34,.25)] ${className}`}>
      <div className="absolute left-1/2 top-3 z-10 h-5 w-[72px] -translate-x-1/2 rounded-full bg-[#171b18]" />
      <div className="overflow-hidden rounded-[2.15rem] bg-white">
        <img src={src} alt={alt} className="block h-auto w-full" />
      </div>
    </div>
  );
}

function Index() {
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  const pricingItems = useMemo(() => [
    [MonitorSmartphone, "המצפן הדיגיטלי — 5 מודולים, 34 פרקים", "497 ₪"],
    [BookOpen, "מילון המושגים המלא", "97 ₪"],
    [ClipboardCheck, "לוח הרכש החכם", "147 ₪"],
    [Sparkles, "פרק המטבח המיוחד", "197 ₪"],
  ], []);

  function handlePayment(event) {
    event.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    const url = `${PAYMENT_BASE}?subscribers_email=${encodeURIComponent(email.trim())}&subscribers_name=${encodeURIComponent(fullName.trim())}`;
    setPaymentUrl(url);
    window.setTimeout(() => document.getElementById("payment-frame")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  return (
    <main data-theme="forest" data-design="mosaic" dir="rtl" className="theme-root min-h-screen overflow-hidden bg-canvas font-Heebo,sans-serif text-ink">
      <HeroSection/>
      <HomeBuildingIntro />
      {/*7 הטעויות  */}
      <MistakesCompass mistakes={mistakes} />

      <ImagineSection cta={<CTAButton className="mt-7">אני רוצה לראות מה בפנים</CTAButton>} />

      <section id="modules" className="section-pad bg-canvas">
        <div className="page-wrap">
          <SectionHeading eyebrow="תוכן המצפן" title="חמישה מודולים." accent="מסלול אחד מסודר." description="אפשר להתחיל מהשלב שבו אתם נמצאים ולהתקדם בקצב שלכם." />
          <div className="grid gap-5 lg:grid-cols-5">
            {modules.map((item, index) => (
              <Reveal key={item.title} delay={index * 70} className={item.featured ? "lg:-translate-y-4" : ""}>
                <article className={`relative h-full overflow-hidden rounded-[2rem] border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${item.featured ? "border-primary bg-deep text-white shadow-xl" : "border-line bg-surface"}`}>
                  <span className={`absolute left-3 top-1 text-7xl font-black ${item.featured ? "text-white/[.05]" : "text-primary/[.06]"}`}>0{index + 1}</span>
                  <img src={item.icon} alt="" className="relative h-16 w-16 object-contain" />
                  <div className="relative mt-6">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.featured ? "bg-white/10 text-[#c6e3a0]" : "bg-soft text-primary"}`}>{item.count}</span>
                    <h3 className="mt-4 text-2xl font-black">{item.title}</h3>
                    <p className={`mt-3 text-sm font-medium leading-7 ${item.featured ? "text-white/65" : "text-muted"}`}>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad overflow-hidden bg-surface">
        <div className="page-wrap">
          <SectionHeading eyebrow="כך זה נראה" title="המצפן הולך איתכם" accent="ישר מהטלפון" description="שלושה מסכים, מאות החלטות, מקום אחד מסודר." />
          <div className="flex items-end justify-center gap-3 px-2 sm:gap-6 md:gap-10">
            <PhoneMockup src={screen3} alt="מסך מודולים" className="w-[27%] max-w-[220px] translate-y-8 -rotate-3" />
            <PhoneMockup src={screen2} alt="מסך רשימת משימות" className="z-10 w-[31%] max-w-[250px]" />
            <PhoneMockup src={screen1} alt="מסך מילון מושגים" className="w-[27%] max-w-[220px] translate-y-8 rotate-3" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-canvas">
        <div className="page-wrap">
          <SectionHeading eyebrow="מצטרפים ומקבלים" title="שלושה בונוסים" accent="שחוסכים זמן והתלבטויות" />
          <div className="grid gap-5 md:grid-cols-3">
            {bonuses.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <article className="card-shell group h-full p-7 text-center">
                  <img src={item.icon} alt="" className="mx-auto h-36 w-36 object-contain transition duration-500 group-hover:scale-105" />
                  <span className="mt-4 inline-block rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">בונוס #{index + 1}</span>
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-muted">{item.text}</p>
                  <p className="mt-5 text-sm font-bold text-muted line-through">שווי {item.value}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="testimonial-section section-pad relative isolate overflow-hidden bg-deep bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${testimonialsBackground})` }}
      >
        <div className="absolute inset-0 -z-10 bg-deep/55" />
        <div className="page-wrap relative">
          <SectionHeading eyebrow="משתתפים מספרים" title="יותר סדר." accent="יותר ביטחון בדרך." light />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map(([quote, name, stage], index) => (
              <Reveal key={name} delay={index * 90}>
                <figure className="speech-card relative h-full rounded-[2rem] border border-white/10 bg-[#334235]/90 p-7 shadow-[0_22px_55px_rgba(7,16,9,.20)] backdrop-blur-md">
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

      <FaqSection  faqs={faqs}/>

      <JoinSteps />

      <PricingSection photo={pricingPhoto}/>



      {/*מילה לסיום */}
      <PersonalNote/>

      {/*הסוף  */}
<section className="relative overflow-hidden bg-deep px-5 py-10 text-center text-white md:py-14">
  <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_50%_0%,rgba(158,193,114,.6),transparent_45%)]" />
  <Reveal className="relative mx-auto max-w-2xl">
    <Compass size={36} className="mx-auto animate-[spin_8s_linear_infinite] text-[#b7da86]" />
    <h2 className="mt-4 text-2xl font-black leading-tight md:text-4xl">נכנסים לתהליך עם מצפן.</h2>
    <p className="mx-auto mt-3 max-w-xl text-base font-medium leading-7 text-white/65 md:text-lg">
      עושים סדר, מבינים מה לבדוק ומתקדמים שלב אחר שלב.
    </p>
    <CTAButton className="mt-5">אני רוצה את המצפן לבונה</CTAButton>
  </Reveal>
</section>
      <footer className="theme-footer bg-[#111811] px-5 py-8 text-white/55">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm md:flex-row md:text-right">
          <img src={logo} alt="בית בשתי ידיים" className="h-10 w-auto brightness-0 invert opacity-80" />
          <p>© בית בשתי ידיים | אסף סרויה</p>
          <a href="mailto:baitb2yadayim@gmail.com" className="transition hover:text-white">baitb2yadayim@gmail.com</a>
        </div>
      </footer>

    </main>
  );
}

export default Index;
