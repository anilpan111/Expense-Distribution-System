import {configureStore} from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'
import eventSlice from './Slices/eventSlice'
import chatSlice from './Slices/chatSlice'
const store = configureStore({
    reducer: {
        auth:authSlice,
        event:eventSlice,
        chats:chatSlice
    }
})

export default store