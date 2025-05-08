import {configureStore} from '@reduxjs/toolkit'
import profileSlice from '../slices/profileSlice.js'

const store = configureStore({
    reducer : {
        profile: profileSlice,
    }
})

export default store