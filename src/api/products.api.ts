import { FindProductDto } from "../store/slices/blacklist.slice";
import { fetchProductSuccess } from "../store/slices/product.slice";

export const productsApi = (builder: any) => ({

    getProducts: builder.query({
        query: (filters: FindProductDto) => {
            const filt = {
                ...filters,
                categories: filters.categories?.map((category) => category.item.id),
                brands: filters.brands?.map((brand) => brand.item.id),
                subCategories: filters.subCategories?.map((subCategory) => subCategory.item.id),
                colores: filters.colores?.map((color) => color.item.id),
                sizes: filters.sizes?.map((size) => size.item.id),
                features: filters.features?.map((feature) => feature.item.id),
                seasones: filters.seasones?.map((season) => season.item.id),
            }          
            return `/products?findProductsDto=${JSON.stringify(filt)}`;
        },
        providesTags: ['Products'],
        async onQueryStarted(_args:any, { queryFulfilled }:any) {
            try {
                const { data } = await queryFulfilled;
                
                console.log(data, 'data api');
            }
            catch (err) {
                console.log(err);
            }
        },
    }),
    getNewestProducts: builder.query({
        // Use '/products/topNewProducts' as the query function to fetch the newest products
        query: () => '/products/topNewProducts',
        providesTags: ['Products'],
        async onQueryStarted(args:any, { dispatch, queryFulfilled }:any) {
            try {
                const { data } = await queryFulfilled;
                console.log(args, 'args');
                dispatch(fetchProductSuccess(data));
            }
            catch (err) {
                console.log(err);
            }
        },
    }),
    getProductById: builder.query({
        // The URL for the request is '/fakeApi/posts'
        query: (id:any) => `/products/${id}`,
        providesTags: ['Products']
    }),
    newProduct: builder.mutation({
        query: (newProduct:any) => ({
            url: '/products',
            method: 'POST',
            body: newProduct,
        }),
        invalidatesTags: ['Products']
    }),
    updateSingleProduct: builder.mutation({
        query: (updateProduct: any) => ({
            url: `/products/${updateProduct.id}`,
            method: 'PATCH',
            body: updateProduct.data,
        }),
        invalidatesTags: ['Products']
    }),
    
    deleteProduct: builder.mutation({
        query: (id:any) => ({
            url: `/products/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['Products']
    }),
    deleteProductImage: builder.mutation({
        query: (id:any) => ({
            url: `/product-images/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['Products']
    })
});