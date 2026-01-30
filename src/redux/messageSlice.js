import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        notification : null
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setNotifications:(state,action)=>{
            let msg = [action.payload];
            state.notification = msg?.length;
        },
        clearNotification : (state,action)=>{
            state.notification = null;
        }
    }
})

export const { setMessages, setNotifications,clearNotification } = messageSlice.actions
export default messageSlice.reducer