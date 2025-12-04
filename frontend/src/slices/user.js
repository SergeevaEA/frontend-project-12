import { createSlice } from '@reduxjs/toolkit'

const initialState = { // { token: ..., username: 'admin' }
  username: '',
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username
      state.token = action.payload.token
    },
    logout: (state) => {
      state.username = ''
      state.token = ''
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
