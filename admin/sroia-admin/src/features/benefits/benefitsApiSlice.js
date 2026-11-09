import apiSlice from "../../app/apiSlice"

// הטבות: מי מקבל מייל כשלקוח מבקש הטבה (נגב קרמיקה וכו')
const benefitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // כל ההטבות + רשימת המיילים של כל אחת + כמה בקשות היו
    getBenefitsOverview: build.query({
      query: () => "/api/benefit-notifications/overview",
      providesTags: ["Benefits"],
    }),
    // כל מי שביקש הטבה - ללשונית "בקשות הטבה" ליד הפניות
    getBenefitRequests: build.query({
      query: () => "/api/benefit-notifications/requests",
      providesTags: ["Benefits"],
    }),
    // רשימה ראשונה להטבה שעוד אין לה רשימה (עם המייל הראשון)
    createBenefitList: build.mutation({
      query: ({ benefit, recipient }) => ({
        url: "/api/benefit-notifications",
        method: "POST",
        body: { benefit, recipients: [recipient] },
      }),
      invalidatesTags: ["Benefits"],
    }),
    addBenefitRecipient: build.mutation({
      query: ({ listId, name, email }) => ({
        url: `/api/benefit-notifications/${listId}/recipients`,
        method: "POST",
        body: { name, email },
      }),
      invalidatesTags: ["Benefits"],
    }),
    removeBenefitRecipient: build.mutation({
      query: ({ listId, email }) => ({
        url: `/api/benefit-notifications/${listId}/recipients/${encodeURIComponent(email)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Benefits"],
    }),
    // הפעלה / עצירה של שליחת המיילים להטבה
    setBenefitActive: build.mutation({
      query: ({ listId, isActive }) => ({
        url: "/api/benefit-notifications",
        method: "PUT",
        body: { id: listId, isActive },
      }),
      invalidatesTags: ["Benefits"],
    }),
  }),
})

export const {
  useGetBenefitsOverviewQuery,
  useGetBenefitRequestsQuery,
  useCreateBenefitListMutation,
  useAddBenefitRecipientMutation,
  useRemoveBenefitRecipientMutation,
  useSetBenefitActiveMutation,
} = benefitsApiSlice
