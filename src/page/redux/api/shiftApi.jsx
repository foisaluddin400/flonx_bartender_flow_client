import { baseApi } from "./baseApi";

const shift = baseApi.injectEndpoints({
  endpoints: (builder) => ({
getMyShift: builder.query({
  query: ({ status }) => ({
    url: `/shift/my-shift?status=${status}`,
    method: "GET",
  }),
  providesTags: ["updateProfile"],
}),

    getSingleShift: builder.query({
      query: ({ id }) => {
        return {
          url: `/shift/single-shift/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

     getSingleVenueShift: builder.query({
      query: ({ id }) => {
        return {
          url: `/venue/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addShiftRequest: builder.mutation({
      query: (data) => {
        return {
          url: "/shift/send-request",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAllShift: builder.query({
      query: ({ searchTerm, page, limit, status }) => ({
        url: `/shift/my-shift`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          status: status || undefined, // 🔥 key part
        },
      }),
      providesTags: ["shift"],
    }),

    updateShiftRequest: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/shift/accept-reject/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  useAddShiftRequestMutation,
  useGetMyShiftQuery,
  useGetAllShiftQuery,
  useGetSingleShiftQuery,
  useUpdateShiftRequestMutation,
    useGetSingleVenueShiftQuery,
} = shift;
