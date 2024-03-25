import { BrandFormData, NewBrand } from "../models/brand.model";
export const brandsApi = (builder: any) => ({
    getBrands: builder.query({
      query: () => '/brands',
      providesTags: ['Brands'],
    }),
    getBrand: builder.query({
      query: (id: number) => `/brands/${id}`,
      providesTags: ['Brands']
    }),
    addNewBrand: builder.mutation({
      query: (newBrand: NewBrand) => ({
        url: '/brands',
        method: 'POST',
        body: newBrand
      }),
      invalidatesTags: ['Brands']
    }),
    updateBrand: builder.mutation({
      query: ({ id, formData }: {id: number, formData: BrandFormData}) => ({
        url: `/brands/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Brands']
    }),
    deleteBrand: builder.mutation({
      query: (id: number) => ({
        url: `/brands/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Brands']
    }),
  });
  