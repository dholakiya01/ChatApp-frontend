import { setMessages } from '@/redux/messageSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UseGetmessages = async () => {
    const { selectedUser } = useSelector(store => store.user)
    const dispatch = useDispatch()
    // console.log(selectedUser, "selectedUser.....");
    

    useEffect(() => {
        const token = localStorage.getItem('token')
        // console.log(token,"token");
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message/${selectedUser?._id}`,
                    {},
                    {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem('token')
                    },
                    withCredentials: true
                });
                console.log(response,"responmse");
                dispatch(setMessages(response.data))
                // console.log(response.data.data, "message response");
            } catch (error) {
                console.log(error, "Error message");
            }
        }
        fetchMessages()
    }, [selectedUser])
}

export default UseGetmessages