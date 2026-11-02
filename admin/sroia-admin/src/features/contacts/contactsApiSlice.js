import apiSlice from "../../app/apiSlice"

const contactsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // כל הפניות
    getContacts: build.query({
      query: () => "/api/manager/contacts",
      providesTags: ["Contact"],
    }),
    // עדכון: { id, isRead } / { id, isReplied } / { id, adminNote }
    updateContact: build.mutation({
      query: ({ id, ...changes }) => ({
        url: `/api/manager/contacts/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Contact"],
    }),
    // מחיקה
    deleteContact: build.mutation({
      query: (id) => ({
        url: `/api/manager/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
})

export const {
  useGetContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApiSlice