import apiSlice from "../../app/apiSlice"

const managersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // כל המנהלים (השרת לא מחזיר סיסמאות)
    getManagers: build.query({
      query: () => "/api/auth",
      providesTags: ["Manager"],
    }),
    // הוספת מנהל: { name, manName, email, phone, password }
    addManager: build.mutation({
      query: (data) => ({ url: "/api/auth/register", method: "POST", body: data }),
      invalidatesTags: ["Manager"],
    }),
    deleteManager: build.mutation({
      query: (id) => ({ url: `/api/auth/${id}`, method: "DELETE" }),
      invalidatesTags: ["Manager"],
    }),
  }),
})

export const {
  useGetManagersQuery,
  useAddManagerMutation,
  useDeleteManagerMutation,
} = managersApiSlice
