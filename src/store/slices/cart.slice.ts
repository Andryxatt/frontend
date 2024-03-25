import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartElementSize = {
    id: number;
    quantity: number;
    CM: string;
}

export type CartElement = {
    productId: number;
    sizes: CartElementSize[];
}

interface AddElementPayload {
    productId: number;
    sizes: any[];
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartElements: [] as CartElement[]
    },
    reducers: {
        addItem: (state, action: PayloadAction<AddElementPayload>) => {
            const{productId, sizes} = action.payload;
            console.log(productId, sizes);
            const newCartItem: CartElement = {
                productId,
                sizes: sizes.map((sizeId) => ({ id: sizeId.id, quantity: 1, CM: sizeId.size.CM}))
            }
            const existingCartItem = state.cartElements.find((item) => item.productId === productId);
            if (existingCartItem) {
                const existingSize = existingCartItem.sizes.find((size) => size.id === sizes[0].id);
                if (existingSize) {
                    existingSize.quantity++;
                    return;
                }
                existingCartItem.sizes.push(newCartItem.sizes[0]);
                return;
            }
            state.cartElements.push(newCartItem);
        },
        removeItem: (state, action: PayloadAction<{productId: number, sizeId:number}>) => {
            const {productId, sizeId} = action.payload;
            const existingCartItem = state.cartElements.find((item) => item.productId === productId);
            //if existingCartItem sizes.lenght > 1 remove size, else remove item
            if (existingCartItem) {
                if (existingCartItem.sizes.length > 1) {
                    existingCartItem.sizes = existingCartItem.sizes.filter((size) => size.id !== sizeId);
                    return;
                }
            }
            state.cartElements = state.cartElements.filter((item) => item.productId !== productId);
        },
        updateItem: (state, action: PayloadAction<{ productId: number; sizeId: number; qty: number }>) => {
            const { productId, sizeId, qty } = action.payload;
            const cartItem = state.cartElements.find((item) => item.productId === productId);
            if (cartItem) {
                const size = cartItem.sizes.find((size) => size.id === sizeId);
                if (size) {
                    size.quantity += qty;
                }
            }
        }
    }
})

export const { addItem, removeItem, updateItem } = cartSlice.actions

export default cartSlice.reducer
