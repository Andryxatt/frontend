// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from './../store/store'
import { brandsApi } from './brands.api'
import { categoriesApi } from './categories.api'
import { productsApi } from './products.api'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userSlice.token
      headers.append('Access-Control-Allow-Origin', '*')      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        console.log(token, 'token');
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
      ...productsApi(builder),
    getSeasones: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/seasones',
      providesTags: ['Seasones']
    }),
    getSeason: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `/seasones/${id}`,
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

    getGenders: builder.query({
      query: () => '/genders',
      providesTags: ['Genders']
    }),
    getGender: builder.query({
      query: (id) =>({
        url: `/genders/${id}`,
        method: 'GET'
      }),
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
    getColor: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `/colores/${id}`,
      providesTags: ['Colores']
    }),
    getDiscounts: builder.query({
      query: () => '/discounts',
      providesTags: ['Discounts']
    }),
    getDiscount: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `/discounts/${id}`,
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
    getFeature: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `/features/${id}`,
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
    getSubCategory: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `/sub-categories/${id}`,
      providesTags: ['SubCategories']
    }),
    getSizes: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/sizes',
      providesTags: ['Sizes']
    }),
    getSize: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `/sizes/${id}`,
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
  useGetSubCategoryQuery,
  //Size
  useGetSizesQuery,
  useNewSizesMutation,
  useUpdateSizesMutation,
  useDeleteSizesMutation,
  useGetSizeQuery,
  //Product
  useGetProductsQuery,
  useNewProductMutation,
  useUpdateSingleProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetNewestProductsQuery,

  //Season
  useGetSeasonesQuery,
  useAddNewSeasonMutation,
  useUpdateSeasonMutation,
  useDeleteSeasonMutation,
  useGetSeasonQuery,
  //Gender
  useGetGendersQuery,
  useAddNewGenderMutation,
  useUpdateGenderMutation,
  useDeleteGenderMutation,
  useGetGenderQuery,
  //Colores
  useGetColoresQuery,
  useAddNewColoresMutation,
  useUpdateColoresMutation,
  useDeleteColoresMutation,
  useGetColorQuery,

  //Discounts
  useGetDiscountsQuery,
  useAddNewDiscountsMutation,
  useUpdateDiscountsMutation,
  useDeleteDiscountsMutation,
  useGetDiscountQuery,

  //Features
  useGetFeaturesQuery,
  useAddNewFeaturesMutation,
  useUpdateFeaturesMutation,
  useDeleteFeaturesMutation,
  useGetFeatureQuery,
  

  useDeleteProductImageMutation
} = apiSlice