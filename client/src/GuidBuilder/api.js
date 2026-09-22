
import axios from "axios";
 
// אם VITE_API_URL לא מוגדר (למשל שכחת ליצור .env), נופלים חזרה
// ל-localhost:7500 כברירת מחדל לפיתוח מקומי.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:7500";
 
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
 
export default api;