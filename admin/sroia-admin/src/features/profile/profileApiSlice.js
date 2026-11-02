import apiSlice from "../../app/apiSlice"

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // עדכון המנהל המחובר: { name, email, phone } או { currentPassword, newPassword }
    // השרת יודע מי המנהל לפי הטוקן - לא שולחים id
    updateMe: build.mutation({
      query: (data) => ({ url: "/api/auth/me", method: "PATCH", body: data }),
      invalidatesTags: ["Manager"], // גם רשימת המנהלים תתעדכן
    }),
  }),
})

export const { useUpdateMeMutation } = profileApiSlice
