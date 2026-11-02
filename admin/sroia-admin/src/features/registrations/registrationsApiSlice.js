import apiSlice from "../../app/apiSlice"

// הרשמות ורכישות: קורס ומצפן (מ-Cardcom) ונרשמים למדריך
const registrationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRegistrations: build.query({
      query: () => "/api/manager/registrations",
      providesTags: ["Registration"],
    }),
  }),
})

export const { useGetRegistrationsQuery } = registrationsApiSlice
