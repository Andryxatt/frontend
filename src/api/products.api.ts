import { fetchProductSuccess } from "../store/slices/product.slice";

export const productsApi = (builder: any) => ({

    getProducts: builder.query({
        query: ({ page, limit, search, filters }:any) => `/products?page=${page}&limit=${limit}&search=${search}&filters=${filters}`,
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
        query: (updateProduct: any, id:string) => ({
            url: `/products/${updateProduct.id}`,
            method: 'PATCH',
            body: updateProduct.data,
        }),
        onQueryStarted(args: any, { dispatch, queryFulfilled }: any) {
            try {
                console.log('queryFulfilled:', queryFulfilled);
                const { data } = queryFulfilled;
                console.log('updateProduct data:', data);
                console.log('updateProduct args:', args);
            } catch (err) {
                console.error('Error logging updateProduct:', err);
            }
        },
  
        invalidatesTags: ['Products']
    }),
    
    // updateSingleProduct: builder.mutation({
    //     query: (updateProduct:any) => ({
    //         url: `/products/${updateProduct.id}`,
    //         method: 'PATCH',
    //         body: updateProduct.data,
    //         Headers: {
    //             'Content-Type': 'multipart/form-data'            }
    //     }),
    //     onQueryStarted(args:any, { dispatch, queryFulfilled }:any) {
    //         try {
    //             const { data } = queryFulfilled;
    //             console.log(data, 'data');
    //             console.log(args, 'args');
    //         }
    //         catch (err) {
    //             console.log(err);
    //         }
    //     },
    //     invalidatesTags: ['Products']
    // }),
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