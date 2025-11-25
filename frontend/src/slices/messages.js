import { createSlice } from '@reduxjs/toolkit'

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
    }
})

export const { setMessages, postMessage } = messagesSlice.actions
export default messagesSlice.reducer