import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:7500",       // כתובת השרת
  credentials: "include",                 // שולח ומקבל את העוגייה
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token   // פותח את המגירה
    if (token) {
      headers.set("authorization", `Bearer ${token}`) // מצרף לבקשה
    }
    return headers
  },
})

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Contact", "Image", "Video", "Manager"],
  endpoints: () => ({}),                  // ריק: כל נושא יוסיף את שלו
})

export default apiSlice