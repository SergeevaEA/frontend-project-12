import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.js'
import channelsReducer from './channels.js'
import messagesReducer from './messages.js'

export default configureStore({
    reducer: {
        // Свойство auth будет внутри объекта общего состояния: state.counter
        user: userReducer,
        channels: channelsReducer,
        messages: messagesReducer
    }
})