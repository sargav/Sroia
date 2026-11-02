import apiSlice from "../../app/apiSlice"

// המספרים שמופיעים באתר: כמה פרויקטים ליווינו, חיסכון ממוצע
const siteStatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSiteStats: build.query({
      query: () => "/api/site-stats",
      providesTags: ["SiteStats"],
    }),
    updateSiteStats: build.mutation({
      query: (data) => ({ url: "/api/manager/site-stats", method: "PATCH", body: data }),
      invalidatesTags: ["SiteStats"],
    }),
  }),
})

export const { useGetSiteStatsQuery, useUpdateSiteStatsMutation } = siteStatsApiSlice
