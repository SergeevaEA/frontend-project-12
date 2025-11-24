import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.js'

export default configureStore({
    reducer: {
        // Свойство auth будет внутри объекта общего состояния: state.counter
        user: userReducer,
    }
})