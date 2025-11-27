import { createSlice } from '@reduxjs/toolkit'
import { logout } from './user.js'

const initialState = {
    entities: {
        '1': { id: '1', name: 'general', removable: false },
        '2': { id: '2', name: 'random', removable: false }
    },
    ids: ['1'],
    currentChannelId: '1', // так как с сервера приходят данные [{ id: '1', name: 'general', removable: false }, ...]
}

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannels: (state, action) => {
            const channels = action.payload
            state.entities = {}
            channels.forEach(ch => {
                state.entities[ch.id] = ch
            })
            state.ids = channels.map(ch => ch.id)
        },
        postNewChannel: (state, action ) => {
            const newChannel = action.payload
            state.entities[newChannel.id] = newChannel
        },
        setCurrentChannelId: (state, action) => {
            state.currentChannelId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.entities = { '1': { id: '1', name: 'general', removable: false }, '2': { id: '2', name: 'random', removable: false } }
            state.ids = ['1', '2']
            state.currentChannelId = '1'
        })
    },
})

export const { setChannels, postNewChannel, setCurrentChannelId } = channelsSlice.actions
export default channelsSlice.reducer