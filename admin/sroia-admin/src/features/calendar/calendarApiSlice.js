import apiSlice from "../../app/apiSlice"

const calendarApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // ===== אירועים =====
    // { from, to } כתאריכי ISO
    getEvents: build.query({
      query: ({ from, to }) => ({ url: "/api/manager/events", params: { from, to } }),
      providesTags: ["Event"],
    }),
    addEvent: build.mutation({
      query: (data) => ({ url: "/api/manager/events", method: "POST", body: data }),
      invalidatesTags: ["Event"],
    }),
    updateEvent: build.mutation({
      query: ({ id, ...changes }) => ({ url: `/api/manager/events/${id}`, method: "PATCH", body: changes }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: build.mutation({
      query: (id) => ({ url: `/api/manager/events/${id}`, method: "DELETE" }),
      invalidatesTags: ["Event"],
    }),

    // ===== משימות =====
    // scope: 'mine' (רק שלי) או 'all' (של כולם)
    getTasks: build.query({
      query: (scope) => ({ url: "/api/manager/tasks", params: scope === "all" ? { scope: "all" } : undefined }),
      providesTags: ["Task"],
    }),
    addTask: build.mutation({
      query: (data) => ({ url: "/api/manager/tasks", method: "POST", body: data }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation({
      query: ({ id, ...changes }) => ({ url: `/api/manager/tasks/${id}`, method: "PATCH", body: changes }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: build.mutation({
      query: (id) => ({ url: `/api/manager/tasks/${id}`, method: "DELETE" }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = calendarApiSlice
