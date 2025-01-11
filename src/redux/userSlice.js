import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'User',
    initialState: {
        authUser: null,
        otherUsers: null,
        selectedUser:null,
        onlineUser:null
    },
    reducers: {
        setAuthuser: (state, action) => {
            state.authUser = action.payload
        },
        setOtherUser: (state, action) => {
            state.otherUsers = action.payload;
        },
        setselectedUser:(state,action)=>{
            state.selectedUser = action.payload
        },
        setOnlineusers: (state,action)=>{
            state.onlineUser = action.payload
        }
    }
});
export const { setAuthuser, setOtherUser,setselectedUser,setOnlineusers } = userSlice.actions
export default userSlice.reducer