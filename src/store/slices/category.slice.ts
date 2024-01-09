import { createSlice } from '@reduxjs/toolkit'

export const brandSlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    fetchBrands: (state, action) => {
        state.categories = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export default brandSlice.reducer