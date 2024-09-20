import {configureStore} from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'
import eventSlice from './Slices/eventSlice'

const store = configureStore({
    reducer: {
        auth:authSlice,
        event:eventSlice
    }
})

export default store