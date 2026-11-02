import { useEffect, useState } from "react";
import api from "../api-config";

// המספרים שמופיעים באתר. המנהל מעדכן אותם מפאנל הניהול.
// עד שהתשובה מגיעה מהשרת (או אם השרת לא עונה) - מוצגים המספרים האלה
const DEFAULTS = { projectsCount: 100, avgSavings: 120000 };

// 120000 -> "₪120K"
export const formatSavings = (n) =>
  n >= 1000 ? `₪${Math.round(n / 1000)}K` : `₪${n}`;

export default function useSiteStats() {
  const [stats, setStats] = useState(DEFAULTS);

  useEffect(() => {
    api
      .get("/api/site-stats")
      .then((res) => setStats({ ...DEFAULTS, ...res.data }))
      .catch(() => {}); // נשארים עם ברירת המחדל
  }, []);

  return stats;
}
