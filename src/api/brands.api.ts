export const brandsApi = (builder: any) => ({
    getBrands: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/brands',
      providesTags: ['Brands']
    }),
    getBrand: builder.query({
      query: (id: any) => `/brands/${id}`,
      providesTags: ['Brands']
    }),
    addNewBrand: builder.mutation({
      query: (newBrand: any) => ({
        url: '/brands',
        method: 'POST',
        body: newBrand
      }),
      invalidatesTags: ['Brands']
    }),
    updateBrand: builder.mutation({
      query: ({ id, formData }: any) => ({

        url: `/brands/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Brands']
    }),
    deleteBrand: builder.mutation({
      query: (id: any) => ({
        url: `/brands/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Brands']
    }),
  });
  