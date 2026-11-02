import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setToken, logOut } from "../features/auth/authSlice"

// השליח: שולח כל בקשה לשרת
const baseQuery = fetchBaseQuery({
  // כתובת השרת. אם יש קובץ .env עם VITE_API_URL - לוקחים משם, אחרת השרת המקומי
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:7500",
  credentials: "include",                 // שולח ומקבל את העוגייה (טוקן הרענון)
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token   // פותח את המגירה
    if (token) {
      headers.set("authorization", `Bearer ${token}`) // מצרף לבקשה
    }
    return headers
  },
})

// בקשות של ההתחברות עצמה לא מנסות רענון:
// 401 בלוגין = סיסמה שגויה, ורענון של refresh היה יוצר לולאה אינסופית
const AUTH_URLS = ["/api/auth/login", "/api/auth/refresh", "/api/auth/logout"]

// עטיפה של השליח: אם הטוקן פג - מחדשת אותו ושולחת שוב את אותה בקשה
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // 1. שולחים את הבקשה כרגיל
  let result = await baseQuery(args, api, extraOptions)

  const url = typeof args === "string" ? args : args.url
  const status = result.error?.status

  // 2. השרת אמר שהטוקן פג (403) או חסר (401) - מנסים לרענן
  if ((status === 401 || status === 403) && !AUTH_URLS.includes(url)) {
    // הדפדפן שולח את העוגייה לבד, בזכות credentials: "include"
    const refreshResult = await baseQuery("/api/auth/refresh", api, extraOptions)

    if (refreshResult.data?.accessToken) {
      // 3. הצליח - שמים את הטוקן החדש במגירה ושולחים שוב את הבקשה המקורית
      api.dispatch(setToken(refreshResult.data.accessToken))
      result = await baseQuery(args, api, extraOptions)
    } else {
      // 4. גם העוגייה פגה (אחרי יום) או שהמנהל נמחק - מנתקים
      api.dispatch(logOut())
    }
  }
  return result
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Contact", "Image", "Video", "Manager", "Event", "Task"],
  endpoints: () => ({}),                  // ריק: כל נושא יוסיף את שלו
})

export default apiSlice
