import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react'
import asaf from './assete/asaf-02.png'
import view1 from './assete/viewStatic.jpg'
import lev from './assete/l.webp'
import qu from './assete/qu.webp'
import cumpIcon from './assete/cump.webp'
import x from './assete/towhands-11.png'
import asafNaim from './assete/asafnaim.webp'
import AboutAsaf from '../components/AboutAsaf'
import pi4 from './assete/pi4.png'
import PSSection from './PSSection';
import CTAFormSection from './CTAFormSection'
import FaqSection from "./FaqSection";
import FitSection from './FitSection';
import ScenarioComparisonSection from './ScenarioCard';
// import GalleriesSection from './GalleriesSection';
import SupplierBenefitsSection from './SupplierBenefitsSection';
import GuaranteeSection from './Guarnat';
import FixedBackgroundUrgencySection from './FixedBackgroundUrgencySection'
import CTASection from './takeControle'
import BonusesSection from './Bonus/BonusesSection'
import StatsSection from './StatsSection'
import WhyDifferentSection from './WhyDiferent';
import HardTruthSection from './HardTruthSection'
import CourseModulesSection from './Modules';
import InvestmentSection from './InvestmentSection';
import PainPointSection from './PainPointSection';
import ProblemNarrativeSection from './ProblemNarrativeSection';
import RecognitionSection from './RecognitionSection';
import PersonalStorySection from './whenStrat';
import RecommendationsSection from '../components/RecommendationsSection';
import TestimonialVideos from '../components/TestimonialVideos';

const BaitCourse = () => {
    const GREEN = '#7CB344';
    const GREEN_DARK = '#5a8a2c';
    const DARK = '#1f1f1f';
    const CREAM = '#faf7ec';
    const OLIVE_BG = '#eef0dd';

    // טוען אוטומטית את כל התמונות מהתיקייה
    const galleryModules = import.meta.glob('./assete/galary_shetach/*.{jpg,jpeg,png,webp}', {
        eager: true,
        import: 'default',
    });

    const galleryImages = Object.values(galleryModules);

    const scrollRef = useRef(null);
    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const maxScroll = container.scrollWidth - container.clientWidth;
        const isAtStart = container.scrollLeft <= 0;
        const isAtEnd = container.scrollLeft >= maxScroll - 10; // 10px טולרנס

        if (direction === 1 && isAtEnd) {
            // הגענו לסוף, קפיצה בחזרה להתחלה
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else if (direction === -1 && isAtStart) {
            // הגענו להתחלה, קפיצה לסוף
            container.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: direction * 300, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="text-center text-white font-bold text-lg bg-[#8BC34A] py-2">
                <span dir="rtl" className="inline-block">
                    <span dir="ltr" className="inline-block">87%</span> מהבונים חורגים בממוצע מהתקציב ב-<span dir="ltr" className="inline-block">200,000</span> ש"ח!
                </span>
            </div>

            <div
                className="relative bg-cover bg-center bg-no-repeat min-h-[500px] w-full flex flex-col items-center justify-end"
                style={{ backgroundImage: `url(${view1})` }}
            >
                <div className="absolute inset-0 bg-white/3 backdrop-blur-sm" />

                <img src={asaf} alt="Asaf" className="max-w-xl w-full h-auto z-10" />

                <a
                    href="#cta-form"
                    dir="rtl"
                    className="
                    group/button inline-flex items-center gap-4
                    rounded-full bg-[#8BC34A]
                    px-6 py-3 text-[14px] font-semibold text-[#24301E]
                    shadow-[0_8px_20px_rgba(139,195,74,0.18)]
                    transition-all duration-300
                    hover:gap-6
                    hover:shadow-[0_11px_26px_rgba(139,195,74,0.25)]
                    mb-6
                    z-10
                  "
                >
                    <span>הצטרפו ותתחילו לחסוך עכשיו</span>

                    <span
                        className="transition-transform duration-300 group-hover/button:-translate-x-1"
                        aria-hidden="true"
                    >
                        ←
                    </span>
                </a>
            </div>
            <RecognitionSection />{/*הקטע ההתחלתי-הלב פועם- שאלות וחששות */}
            <PainPointSection />

            <ProblemNarrativeSection />
            {/* <AboutAsaf/> */}
            {/* גלריית תמונות עם חצים */}
            {/* <GallerySection status="start" /> */}
            <PersonalStorySection />{/*לפני 3 שנים-הסיפור מאחורי הכל */}
            <HardTruthSection />{/* האמת שאף אחד לא אומר*/}
            <RecommendationsSection />{/*המלצות של משתתפים בקורס -   תמונות מהאוטסאפ*/}
            <WhyDifferentSection />{/*מה שונה ממה שייש באינטרנט */}
            <CourseModulesSection />{/*מה תקבלו-המודולים */}
            {/*מה לקוחות אומרים -ברטונים וחלקים מואטסאפ*/}
            <InvestmentSection />{/*בואו נדבר  על השקעה */}
            <BonusesSection />{/*בונוסים */}
            <SupplierBenefitsSection />{/*הטבות */}
            <GuaranteeSection />
            <FixedBackgroundUrgencySection />{/*3 סיבות שחשוב שתדעו-עליית המחיר של הקורס*/}
            <CTASection />
            {/*סרטוני המלצות של לקוחות */}
            <TestimonialVideos type="course" />
            {/* <div><div className="text-center mt-6">
                <h2 className="mt-2 text-2xl font-bold text-neutral-900 md:text-3xl">
                    ככה זה נראה כשגומרים נכון
                </h2>
            </div>
                <GallerySection status="finish" />
            </div> */}
            {/* גלילת התמונות של סיום הבניה */}
            <ScenarioComparisonSection /> {/*החלק של בעוד שנה יש לכם 2 אופציות להיות*/}
            <FitSection />{/*הקורס מתאים לכם...*/}
            <FaqSection /> {/*שאלות נפוצות */}

            {/*כאן החלק של מילה אישית לסיום */}
            <PSSection />
            <CTAFormSection />



        </div>
    )
}

export default BaitCourse
