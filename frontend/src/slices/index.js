import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.js'

export default configureStore({
    reducer: {
        // Свойство auth будет внутри объекта общего состояния: state.counter
        auth: authReducer,
    }
})