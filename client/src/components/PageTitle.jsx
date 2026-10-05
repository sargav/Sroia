import { useEffect } from "react";

const SITE_NAME = "סרויה ניהול פרויקטים";

// קובע את הכותרת שמופיעה בלשונית הדפדפן, בתוצאות של גוגל ובמועדפים.
// כשיוצאים מהעמוד, הכותרת חוזרת לשם האתר.
export default function PageTitle({ title, children }) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = SITE_NAME;
    };
  }, [title]);

  return children;
}
