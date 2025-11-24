import { createSlice } from '@reduxjs/toolkit'

// Начальное значение
const initialState = {
    name: '',
    password: '',
    token: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})

export const {} = authSlice.actions
export default authSlice.reducer