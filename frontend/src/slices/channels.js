import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    entities: {
        '1': { id: '1', name: 'general', removable: false }
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
    }
})

export const { setChannels } = channelsSlice.actions
export default channelsSlice.reducer