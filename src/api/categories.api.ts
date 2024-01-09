export const categoriesApi = (builder: any) => ({
    getCategories: builder.query({
        // The URL for the request is '/fakeApi/posts'
        query: () => '/categories',
        providesTags: ['Categories']
      }),
      newCategory: builder.mutation({
        query: (newCategory:any) => ({
          url: '/categories',
          method: 'POST',
          body: newCategory
        }),
        invalidatesTags: ['Categories']
      }),
      getCategory: builder.query({
        query: (id: any) => `/categories/${id}`,
        providesTags: ['Categories']
      }),
      updateCategory: builder.mutation({
        query: (updateCategory:any) => ({
          url: `/categories/${updateCategory.id}`,
          method: 'PATCH',
          body: updateCategory
        }),
        invalidatesTags: ['Categories']
      }),
      deleteCategory: builder.mutation({
        query: (id:any) => ({
          url: `/categories/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Categories']
      }),
});