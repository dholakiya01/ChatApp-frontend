import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'User',
    initialState: {
        authUser: null,
        otherUsers: null,
        selectedUser:null,
        onlineUser:null,
        token : ''
    },
    reducers: {
        setAuthuser: (state, action) => {
            state.authUser = action.payload
            state.token = action.payload.Token
        },
        setOtherUser: (state, action) => {
            state.otherUsers = action.payload;
        },
        setselectedUser:(state,action)=>{
            state.selectedUser = action.payload
        },
        setOnlineusers: (state,action)=>{
            state.onlineUser = action.payload
        },
        logoutSuccess:(state,action)=>{
            state.token = '';
            // localStorage.removeItem('persist:root');
            localStorage.clear();
        }
    }
});
export const { setAuthuser, setOtherUser,setselectedUser,setOnlineusers,logoutSuccess } = userSlice.actions
export default userSlice.reducer