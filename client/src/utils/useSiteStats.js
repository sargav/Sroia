import { useEffect, useState } from "react";
import api from "../api-config";

// המספרים והמחירים שמופיעים באתר. המנהל מעדכן אותם מפאנל הניהול (נתוני האתר).
// עד שהתשובה מגיעה מהשרת (או אם השרת לא עונה) - מוצגים הערכים האלה
const DEFAULTS = {
  projectsCount: 100,
  avgSavings: 120000,
  coursePrice: 1987,
  courseInstallments: 10,
  coursePriceNext: 2700,
  compassPrice: 297,
};

export const formatSavings = (n) =>
  n >= 1000 ? `₪${Math.round(n / 1000)}K` : `₪${n}`;

export const formatPrice = (n) => Number(n).toLocaleString("en-US");

//מחיר חודשי
export const monthlyPayment = (price, installments) =>
  Math.floor(price / Math.max(1, installments));

// כמה רכיבים בדף משתמשים בזה - שולחים לשרת בקשה אחת בלבד ושומרים את התשובה
let cached = null;
let request = null;

export default function useSiteStats() {
  const [stats, setStats] = useState(cached || DEFAULTS);

  useEffect(() => {
    if (cached) return;
    request ||= api
      .get("/api/site-stats")
      .then((res) => (cached = { ...DEFAULTS, ...res.data }))
      .catch(() => {
        request = null; // ננסה שוב בפעם הבאה
        return DEFAULTS;
      });
    let active = true;
    request.then((data) => active && setStats(data));
    return () => {
      active = false;
    };
  }, []);

  return stats;
}
