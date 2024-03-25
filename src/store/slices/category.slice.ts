import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    fetchCategories: (state, action) => {
        state.categories = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export default categorySlice.reducer