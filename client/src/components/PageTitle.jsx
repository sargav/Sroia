import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGES, SITE_NAME, SITE_URL } from "../seo/pages";
import { YEARS_OF_EXPERIENCE } from "../utils/experience";

// משנה (או יוצר) תגית meta בראש הדף
function setMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

// קובע את הכותרת שמופיעה בלשונית הדפדפן, בתוצאות של גוגל ובמועדפים,
// ואת התיאור, הכתובת הקנונית ותגיות השיתוף (og) - לפי העמוד הנוכחי (seo/pages.js).
// כשיוצאים מהעמוד, הכותרת חוזרת לשם האתר.
export default function PageTitle({ title, children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = PAGES[pathname] || {};
    const fullTitle = (page.title || title) ? `${page.title || title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    if (page.description) {
      const description = page.description.replace("%YEARS%", String(YEARS_OF_EXPERIENCE));
      const url = `${SITE_URL}${pathname}`;
      setMeta("name", "description", description);
      setMeta("property", "og:title", fullTitle);
      setMeta("property", "og:description", description);
      setMeta("property", "og:url", url);

      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

    return () => {
      document.title = SITE_NAME;
    };
  }, [title, pathname]);

  return children;
}
