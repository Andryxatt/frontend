import { createSlice } from '@reduxjs/toolkit'

export const subCategorySlice = createSlice({
  name: 'category',
  initialState: {
    subCategories: [],
  },
  reducers: {
    fetchSubCategories: (state, action) => {
        state.subCategories = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export default subCategorySlice.reducer