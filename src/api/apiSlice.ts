// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from './../store/store'
import { fetchProductSuccess } from '../store/slices/product.slice'
import { brandsApi } from './brands.api'
import { categoriesApi } from './categories.api'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userSlice.token
      headers.set('content-type', 'application/json')
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  //auto refetch data
  tagTypes: ['Brands', 'Categories', 'SubCategories', 'Sizes', 'Products', 'Seasones', 'Genders', 'Colores', 'Discounts', 'Features'],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
      ...brandsApi(builder),
      ...categoriesApi(builder),
    getSeasones: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/seasones',
      providesTags: ['Seasones']
    }),
    addNewSeason: builder.mutation({
      query: (newSeason) => ({
        url: '/seasones',
        method: 'POST',
        body: newSeason
      }),
      invalidatesTags: ['Seasones']
    }),
    updateSeason: builder.mutation({
      query: (updateSeason) => ({
        url: `/seasones/${updateSeason.id}`,
        method: 'PATCH',
        body: updateSeason
      }),
      invalidatesTags: ['Seasones']
    }),
    deleteSeason: builder.mutation({
      query: (id) => ({
        url: `/seasones/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Seasones']
    }),

    getGender: builder.query({
      query: () => '/genders',
      providesTags: ['Genders']
    }),
    addNewGender: builder.mutation({
      query: (newGender) => ({
        url: '/genders',
        method: 'POST',
        body: newGender
      }),
      invalidatesTags: ['Genders']
    }),
    updateGender: builder.mutation({
      query: (updateGender) => ({
        url: `/genders/${updateGender.id}`,
        method: 'PATCH',
        body: updateGender
      }),
      invalidatesTags: ['Genders']
    }),
    deleteGender: builder.mutation({
      query: (id) => ({
        url: `/genders/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Genders']
    }),

    getColores: builder.query({
      query: () => '/colores',
      providesTags: ['Colores']
    }),
    addNewColores: builder.mutation({
      query: (newColores) => ({
        url: '/colores',
        method: 'POST',
        body: newColores
      }),
      invalidatesTags: ['Colores']
    }),
    updateColores: builder.mutation({
      query: (updateColores) => ({
        url: `/colores/${updateColores.id}`,
        method: 'PATCH',
        body: updateColores
      }),
      invalidatesTags: ['Colores']
    }),
    deleteColores: builder.mutation({
      query: (id) => ({
        url: `/colores/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Colores']
    }),

    getDiscounts: builder.query({
      query: () => '/discounts',
      providesTags: ['Discounts']
    }),
    addNewDiscounts: builder.mutation({
      query: (newDiscounts) => ({
        url: '/discounts',
        method: 'POST',
        body: newDiscounts
      }),
      invalidatesTags: ['Discounts']
    }),
    updateDiscounts: builder.mutation({
      query: (updateDiscounts) => ({
        url: `/discounts/${updateDiscounts.id}`,
        method: 'PATCH',
        body: updateDiscounts
      }),
      invalidatesTags: ['Discounts']
    }),
    deleteDiscounts: builder.mutation({
      query: (id) => ({
        url: `/discounts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Discounts']
    }),

    getFeatures: builder.query({
      query: () => '/features',
      providesTags: ['Features']
    }),
    addNewFeatures: builder.mutation({
      query: (newFeatures) => ({
        url: '/features',
        method: 'POST',
        body: newFeatures
      }),
      invalidatesTags: ['Features']
    }),

    updateFeatures: builder.mutation({
      query: (updateFeatures) => ({
        url: `/features/${updateFeatures.id}`,
        method: 'PATCH',
        body: updateFeatures
      }),
      invalidatesTags: ['Features']
    }),
    deleteFeatures: builder.mutation({
      query: (id) => ({
        url: `/features/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Features']
    }),




    getSybCategories: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/sub-categories',
      providesTags: ['SubCategories']
    }),
    newSubCategory: builder.mutation({
      query: (newSubCategory) => ({
        url: '/sub-categories',
        method: 'POST',
        body: newSubCategory
      }),
      invalidatesTags: ['SubCategories']
    }),
    updateSubCategory: builder.mutation({
      query: (updateSubCategory) => ({
        url: `/sub-categories/${updateSubCategory.id}`,
        method: 'PATCH',
        body: updateSubCategory
      }),
      invalidatesTags: ['SubCategories']
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/sub-categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['SubCategories']
    }),
    getSizes: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/sizes',
      providesTags: ['Sizes']
    }),
    newSizes: builder.mutation({
      query: (newSize) => ({
        url: '/sizes',
        method: 'POST',
        body: newSize
      }),
      invalidatesTags: ['Sizes']
    }),
    updateSizes: builder.mutation({
      query: (updateSize) => ({
        url: `/sizes/${updateSize.id}`,
        method: 'PATCH',
        body: updateSize
      }),
      invalidatesTags: ['Sizes']
    }),
    deleteSizes: builder.mutation({
      query: (id) => ({
        url: `/sizes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Sizes']
    }),
    getProducts: builder.query({
      query: ({ page, limit, search }) => `/products?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ['Products'],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, 'data api');
        }
        catch (err) {
          console.log(err);
        }
      },
    }),
    getNewestProducts: builder.query<any, void>({
      // Use '/products/topNewProducts' as the query function to fetch the newest products
      query: () => '/products/topNewProducts',
      providesTags: ['Products'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(arg, 'args');
          dispatch(fetchProductSuccess(data));
        }
        catch (err) {
          console.log(err);
        }
      },
    }),
    getProductById: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `/products/${id}`,
      providesTags: ['Products']
    }),
    newProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct
      }),
      invalidatesTags: ['Products']
    }),
    updateProduct: builder.mutation({
      query: (updateProduct) => ({
        url: `/products/${updateProduct.id}`,
        method: 'PATCH',
        body: updateProduct.data
      }),
      invalidatesTags: ['Products']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Products']
    }),
    deleteProductImage: builder.mutation({
      query: (id) => ({
        url: `/product-images/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Products']
    }),
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  //Brand
  useGetBrandsQuery,
  useAddNewBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandQuery,
  //Category
  useGetCategoriesQuery,
  useNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  //SubCategory
  useGetSybCategoriesQuery,
  useNewSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  //Size
  useGetSizesQuery,
  useNewSizesMutation,
  useUpdateSizesMutation,
  useDeleteSizesMutation,
  //Product
  useGetProductsQuery,
  useNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetNewestProductsQuery,

  //Season
  useGetSeasonesQuery,
  useAddNewSeasonMutation,
  useUpdateSeasonMutation,
  useDeleteSeasonMutation,
  //Gender
  useGetGenderQuery,
  useAddNewGenderMutation,
  useUpdateGenderMutation,
  useDeleteGenderMutation,

  //Colores
  useGetColoresQuery,
  useAddNewColoresMutation,
  useUpdateColoresMutation,
  useDeleteColoresMutation,

  //Discounts
  useGetDiscountsQuery,
  useAddNewDiscountsMutation,
  useUpdateDiscountsMutation,
  useDeleteDiscountsMutation,

  //Features
  useGetFeaturesQuery,
  useAddNewFeaturesMutation,
  useUpdateFeaturesMutation,
  useDeleteFeaturesMutation,
  

  useDeleteProductImageMutation
} = apiSlice