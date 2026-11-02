import apiSlice from "../../app/apiSlice"

const imagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // כל התמונות, או רק של קטגוריה אחת: ?category=start
    getImages: build.query({
      query: (category) => ({
        url: "/api/manager/images",
        params: category ? { category } : undefined,
      }),
      providesTags: ["Image"],
    }),
    // העלאה: FormData עם category, clientName (לא חובה) והקבצים בשדה images
    uploadImages: build.mutation({
      query: (formData) => ({ url: "/api/manager/images", method: "POST", body: formData }),
      invalidatesTags: ["Image"],
    }),
    // עדכון: { id, alt, clientName, order }
    updateImage: build.mutation({
      query: ({ id, ...changes }) => ({ url: `/api/manager/images/${id}`, method: "PATCH", body: changes }),
      invalidatesTags: ["Image"],
    }),
    deleteImage: build.mutation({
      query: (id) => ({ url: `/api/manager/images/${id}`, method: "DELETE" }),
      invalidatesTags: ["Image"],
    }),
  }),
})

export const {
  useGetImagesQuery,
  useUploadImagesMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} = imagesApiSlice
