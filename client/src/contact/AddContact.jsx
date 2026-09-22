import React, { useState, useEffect, useRef } from "react";
import api from "../api-config";
import myBgImage from "./assets/v2.png";
import checking from "../functionChecking/functionChecking";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

const AddContact = () => {
  const [errors, setErrors] = useState({
    email: null,
    name: null,
    phone: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [headingDone, setHeadingDone] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const email = data.get("email");
    const name = data.get("name");
    const phone = data.get("phone");
    const message = data.get("message");

    const validationErrors = {
      email: checking.isValidEmail(email) ? null : "מייל לא תקין",
      name: checking.isValidName(name) ? null : "שם לא תקין",
      phone: checking.isValidPhone(phone) ? null : "טלפון לא תקין",
    };

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null
    );

    if (hasErrors) return;

    try {
      await api.post("api/contacts", {
        name,
        email,
        phone,
        message,
        source: "main_contact",
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("שגיאה בשליחת הנתונים:", error);
    }
  };

  return (
    <section
      id="contact"
      dir="rtl"
      className="relative isolate min-h-[680px] overflow-hidden bg-[#EDE8DC] py-16 font-['Heebo',sans-serif] md:py-24"
      style={{
        backgroundImage: `url(${myBgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.6); }
          70% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        @keyframes blinkCursor {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* שכבת שמנת שקופה מעל התמונה */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-l from-[#F5F1E8]/55 via-[#F5F1E8]/48 to-[#F5F1E8]/45" />

      {/* שכבה תחתונה */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-[#E5DFD1]/25 to-transparent" />

      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* תוכן צדדי */}
        <div className="text-center text-[#26321F] lg:text-right">
          <div
            className="mb-5 flex items-center justify-center gap-3 lg:justify-start"
            style={
              visible
                ? { animation: "fadeInUp 0.7s ease-out both" }
                : { opacity: 0 }
            }
          >
            <span className="h-px w-10 bg-[#659B2D]" />

            <span className="text-[13px] font-bold tracking-[0.12em] text-[#659B2D]">
              אנחנו כאן בשבילכם
            </span>
          </div>

          <h2 className="min-h-[2.4em] text-[36px] font-black leading-[1.2] md:min-h-[2.6em] md:text-[50px]">
            <Typewriter
              lines={["בואו נדבר על", "הפרויקט שלכם"]}
              speed={90}
              startDelay={350}
              active={visible}
              lineClassName={(i) => (i === 1 ? "block text-[#659B2D]" : "block")}
              onDone={() => setHeadingDone(true)}
            />
          </h2>

          <p
            className="mx-auto mt-6 max-w-[480px] text-[17px] font-medium leading-[1.9] text-[#4F594A] lg:mx-0"
            style={
              headingDone
                ? { animation: "fadeInUp 0.7s ease-out both" }
                : { opacity: 0 }
            }
          >
            השאירו פרטים ונחזור אליכם כדי להבין את הצורך, לענות על
            השאלות ולעזור לכם להתקדם בצורה ברורה ומסודרת.
          </p>

          {/* שלבים */}
          <div className="mx-auto mt-9 max-w-[450px] lg:mx-0 text-black/99">
            <ContactStep number="01" text="ממלאים פרטים קצרים" visible={headingDone} delay={150} />
            <ContactStep number="02" text="אנחנו עוברים על הפנייה" visible={headingDone} delay={300} />
            <ContactStep
              number="03"
              text="יוצרים איתכם קשר"
              visible={headingDone}
              delay={450}
              last
            />
          </div>
        </div>

        {/* הטופס */}
        <div
          className="
            relative overflow-hidden
            rounded-[34px_12px_34px_12px]
            border border-white/80
            bg-[#FFFDF8]/60 p-6
            shadow-[0_25px_65px_rgba(57,72,46,0.18)]
            backdrop-blur-xl sm:p-9
          "
          style={
            visible
              ? { animation: "fadeInUp 0.8s ease-out 0.15s both" }
              : { opacity: 0 }
          }
        >
          {/* פס ירוק */}
          <div className="absolute right-0 top-0 h-[4px] w-28 rounded-bl-full bg-[#78A93B]" />

          {!submitted && (
            <>
              {/* כותרת הטופס */}
              <div className="relative z-10 mb-7">
                <span className="mb-2 block text-[12px] font-bold text-[#659B2D]">
                  השאירו פרטים
                </span>

                <h3 className="text-[25px] font-bold text-[#26321F]">
                  נחזור אליכם בהקדם
                </h3>

                <p className="mt-2 text-[14px] leading-[1.7] text-[#687062]">
                  מלאו את השדות ונוכל ליצור איתכם קשר.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col gap-5"
              >
                {/* שם וטלפון */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="שם מלא"
                    name="name"
                    type="text"
                    placeholder="ישראל ישראלי"
                    error={errors.name}
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    }
                  />

                  <FormField
                    label="מספר טלפון"
                    name="phone"
                    type="tel"
                    placeholder="050-0000000"
                    error={errors.phone}
                    icon={
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    }
                  />
                </div>

                {/* אימייל */}
                <FormField
                  label="דואר אלקטרוני"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  error={errors.email}
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  }
                />

                {/* הודעה */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="pr-1 text-[13px] font-semibold text-[#4F594A]"
                  >
                    הודעה
                  </label>

                  <div className="relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      placeholder="כתבו כאן את ההודעה שלכם..."
                      className="
                        w-full resize-none rounded-2xl
                        border border-[#CBD7C0]
                        bg-white/75 py-3.5 pl-4 pr-11
                        text-[14px] text-[#26321F]
                        placeholder:text-[#8A9184]
                        outline-none transition-all duration-300
                        hover:border-[#9ABA7A]
                        focus:border-[#78A93B]
                        focus:bg-white
                        focus:ring-4 focus:ring-[#78A93B]/10
                      "
                    />

                    <svg
                      className="pointer-events-none absolute right-4 top-4 h-[18px] w-[18px] text-[#778170]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M8 10h8M8 14h5m-9 7 3.5-3.5H19a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h1v4z"
                      />
                    </svg>
                  </div>
                </div>

                {/* כפתור שליחה */}
                <button
                  type="submit"
                  className="
                    group mt-1 flex w-full items-center
                    justify-between rounded-2xl
                    bg-[#78A93B] px-6 py-4
                    text-[15px] font-black text-white
                    shadow-[0_10px_28px_rgba(120,169,59,0.25)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:bg-[#6E9D35]
                    hover:shadow-[0_15px_35px_rgba(120,169,59,0.34)]
                    active:translate-y-0 active:scale-[0.99]
                  "
                >
                  <span>שליחת הודעה</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:scale-110">
                    ←
                  </span>
                </button>
              </form>
            </>
          )}

          {/* הודעת הצלחה */}
          {submitted && (
            <div className="relative z-10 flex min-h-[450px] flex-col items-center justify-center text-center">
              <div
                className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#78A93B]/30 bg-[#78A93B]/10 text-[38px] font-bold text-[#659B2D]"
                style={{ animation: "popIn 0.6s ease-out both" }}
              >
                ✓
              </div>

              <h3
                className="text-[27px] font-bold text-[#26321F]"
                style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
              >
                הפרטים התקבלו בהצלחה!
              </h3>

              <p
                className="mt-3 max-w-sm text-[15px] leading-[1.8] text-[#687062]"
                style={{ animation: "fadeInUp 0.6s ease-out 0.25s both" }}
              >
                תודה שפניתם אלינו. נציג מטעמנו ייצור איתכם קשר בימים
                הקרובים.
              </p>

              <div
                className="mt-8 flex items-center gap-3 border-t border-[#659B2D]/15 pt-7"
                style={{ animation: "fadeInUp 0.6s ease-out 0.35s both" }}
              >
                <SocialLink
                  href="https://www.instagram.com/sroiaproject?igsh=bnZkbWxva3FrNXc0"
                  label="Instagram"
                >
                  <FaInstagram size={20} />
                </SocialLink>

                <SocialLink
                  href="https://www.facebook.com/share/17V4qfkUeM/"
                  label="Facebook"
                >
                  <FaFacebookF size={19} />
                </SocialLink>

                <SocialLink
                  href="https://wa.me/GGZb8N0x1941Hy1e2rCCtf?s=sh&p=a&ilr=1"
                  label="WhatsApp"
                >
                  <FaWhatsapp size={21} />
                </SocialLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/**
 * מקליד שורות טקסט אות-אות, עם סמן מהבהב.
 * lines: מערך שורות. lineClassName: פונקציה שמקבלת אינדקס ומחזירה class לשורה.
 * onDone: נקרא פעם אחת כשההקלדה של כל השורות הסתיימה.
 */
const Typewriter = ({
  lines,
  speed = 50,
  startDelay = 300,
  active,
  lineClassName,
  onDone,
}) => {
  const [revealCount, setRevealCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const doneCalledRef = useRef(false);

  const totalLength = lines.reduce((sum, line) => sum + line.length, 0);

  useEffect(() => {
    if (!active) return;

    let charsTyped = 0;
    let intervalId;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charsTyped += 1;
        setRevealCount(charsTyped);

        if (charsTyped >= totalLength) {
          clearInterval(intervalId);
          setFinished(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (finished && !doneCalledRef.current) {
      doneCalledRef.current = true;
      if (onDone) onDone();
    }
  }, [finished, onDone]);

  let offset = 0;
  let cursorPlaced = false;

  return (
    <>
      {lines.map((line, i) => {
        const start = offset;
        offset += line.length;
        const shown = Math.max(0, Math.min(line.length, revealCount - start));
        const isCurrentLine = !finished && shown > 0 && shown < line.length;
        const isLastTypedChar =
          !finished && !cursorPlaced && shown === Math.max(0, revealCount - start) && revealCount > start && revealCount <= offset;

        if (isLastTypedChar) cursorPlaced = true;

        return (
          <span key={i} className={lineClassName ? lineClassName(i) : "block"}>
            {line.slice(0, shown)}
            {isLastTypedChar && (
              <span
                className="inline-block w-[2px] translate-y-[2px] bg-current align-middle"
                style={{
                  height: "0.85em",
                  animation: "blinkCursor 1s step-end infinite",
                }}
              />
            )}
          </span>
        );
      })}
    </>
  );
};

const ContactStep = ({ number, text, last = false, visible, delay = 0 }) => {
  return (
    <div
      className={`flex items-center gap-4 py-4 ${
        last ? "" : "border-b border-[#659B2D]/20"
      }`}
      style={
        visible
          ? { animation: `fadeInUp 0.6s ease-out ${delay}ms both` }
          : { opacity: 0 }
      }
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#659B2D]/30 bg-white/45 text-[12px] font-bold text-[#659B2D] backdrop-blur-sm transition-transform duration-300 hover:scale-110">
        {number}
      </span>

      <span className="text-[15px] font-semibold text-[#3F493A]">
        {text}
      </span>
    </div>
  );
};

const FormField = ({
  label,
  name,
  type,
  placeholder,
  error,
  icon,
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={`contact-${name}`}
        className="pr-1 text-[13px] font-semibold text-[#4F594A]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={`contact-${name}`}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`
            w-full rounded-2xl border
            bg-white/75 py-3.5 pl-4 pr-11
            text-[14px] text-[#26321F]
            placeholder:text-[#8A9184]
            outline-none transition-all duration-300
            hover:border-[#9ABA7A]
            focus:bg-white focus:ring-4
            ${
              error
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                : "border-[#CBD7C0] focus:border-[#78A93B] focus:ring-[#78A93B]/10"
            }
          `}
          style={error ? { animation: "shake 0.4s ease-in-out" } : undefined}
        />

        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#778170]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>

      {error && (
        <span className="pr-1 text-[12px] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

const SocialLink = ({ href, label, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex h-11 w-11 items-center justify-center
        rounded-full border border-[#659B2D]/20
        bg-white/70 text-[#596153]
        shadow-sm transition-all duration-300
        hover:-translate-y-1
        hover:border-[#78A93B]
        hover:bg-[#78A93B]
        hover:text-white
      "
    >
      {children}
    </a>
  );
};

export default AddContact;