import { createSlice } from '@reduxjs/toolkit'
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [] as any[], // Add type annotation for cartItems
    },
    reducers: {
        addItem: (state, action) => {
            const { productId, sizes } = action.payload;
            // Check if the product already exists in the cart
            const existingProductIndex = state.cartItems.findIndex((item) => item.productId === productId);
            
            if (existingProductIndex !== -1) {
             //if size already exists, remove it
              const existingSizeIndex = state.cartItems[existingProductIndex].sizes.some((size: any) => sizes.includes(size));
              if (existingSizeIndex !== -1) {
                state.cartItems[existingProductIndex].sizes.splice(existingSizeIndex, 1);
              } else {
                // If the size doesn't exist, add it to the cart
                state.cartItems[existingProductIndex].sizes.concat(sizes);
              }
            } else {
              // If the product doesn't exist, add it to the cart
              state.cartItems.push({ productId, sizes });
            }
          },
    },
})

// Action creators are generated for each case reducer function
export const { addItem } = cartSlice.actions

export default cartSlice.reducer