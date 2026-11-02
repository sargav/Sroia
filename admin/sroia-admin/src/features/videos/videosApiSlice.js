import apiSlice from "../../app/apiSlice"

const videosApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getVideos: build.query({
      query: () => "/api/manager/testi-urls",
      providesTags: ["Video"],
    }),
    // הוספה: { url, name, type }
    addVideo: build.mutation({
      query: (data) => ({ url: "/api/manager/testi-urls", method: "POST", body: data }),
      invalidatesTags: ["Video"],
    }),
    // עדכון: { id, url, name, type }
    updateVideo: build.mutation({
      query: ({ id, ...changes }) => ({ url: `/api/manager/testi-urls/${id}`, method: "PATCH", body: changes }),
      invalidatesTags: ["Video"],
    }),
    deleteVideo: build.mutation({
      query: (id) => ({ url: `/api/manager/testi-urls/${id}`, method: "DELETE" }),
      invalidatesTags: ["Video"],
    }),
  }),
})

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosApiSlice
