import apiSlice from "../../app/apiSlice"

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // התחברות: שולח שם וסיסמה, מקבל { accessToken } + עוגייה
    login: build.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    // טוקן חדש בעזרת העוגייה (GET, העוגייה נשלחת לבד).
    // mutation ולא query - כי קוראים לו ברגע מסוים ולא רוצים שיישמר בזיכרון
    refresh: build.mutation({
      query: () => "/api/auth/refresh",
    }),
    // התנתקות: השרת מוחק את העוגייה
    logout: build.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),
  }),
})

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = authApiSlice
