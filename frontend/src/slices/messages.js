import { createSlice } from '@reduxjs/toolkit'
import { logout } from './user.js'
import { removeChannel } from './channels.js'

const initialState = {
    entities: {},
    ids: [],
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            const messages = action.payload
            state.entities = {}
            messages.forEach(mes => {
                state.entities[mes.id] = mes
            })
            state.ids = messages.map(mes => mes.id)
        },
        postMessage: (state, action) => {
            const message = action.payload
            state.ids.push(message.id)
            state.entities[message.id] = message
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.entities = {}
            state.ids = []
        }),
        builder.addCase(removeChannel, (state) => {
            state.entities = {}
            state.ids = []
        })
    },
})

export const { setMessages, postMessage } = messagesSlice.actions
export default messagesSlice.reducer