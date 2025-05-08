import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    fname: '',
    email: '',
    password: '',
    confirmPwd: ''
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        setProfileDetails(state, action){
            return {...action.payload}
        }
    }
})

export const {setProfileDetails} = profileSlice.actions
export default profileSlice.reducer