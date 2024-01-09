import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/user.model'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:  {} as User,
    token: ''
  },
  reducers: {
    setToken: (state, action) => {
        console.log('action.payload', action.payload)
        state.token = action.payload
    },
    setUser: (state, action) => {
        state.user = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setUser } = userSlice.actions

export default userSlice.reducer