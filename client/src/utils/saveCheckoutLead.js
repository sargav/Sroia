import api from "../api-config";

// שומר בשרת את פרטי הטופס רגע לפני שנפתח התשלום.
// לא זורק שגיאה ומחכה לכל היותר 4 שניות, כדי שתקלה בשמירה לא תמנע מהלקוח לשלם
export default async function saveCheckoutLead(data) {
  try {
    await api.post("/api/checkout-leads", data, { timeout: 4000 });
  } catch (error) {
    console.error("שגיאה בשמירת פרטי הטופס:", error);
  }
}
