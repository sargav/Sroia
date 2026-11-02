import apiSlice from "../../app/apiSlice"

// הרשמות ורכישות: קורס ומצפן (מ-Cardcom) ונרשמים למדריך
const registrationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRegistrations: build.query({
      query: () => "/api/manager/registrations",
      providesTags: ["Registration"],
    }),
    // סימון "קיבל גישה" לרוכש
    setHandled: build.mutation({
      query: ({ id, handled }) => ({ url: `/api/manager/registrations/payments/${id}`, method: "PATCH", body: { handled } }),
      invalidatesTags: ["Registration"],
    }),
  }),
})

export const { useGetRegistrationsQuery, useSetHandledMutation } = registrationsApiSlice
