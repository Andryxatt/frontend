import { createSlice } from '@reduxjs/toolkit'
export interface IBrand {
  id: number;
  name: string;
  description: string;
  iconPath: string;
  created_at: string;
  updated_at: string;
}
export const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
  },
  reducers: {
    fetchBrands: (state, action) => {
        state.brands = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { fetchBrands } = brandSlice.actions

export default brandSlice.reducer