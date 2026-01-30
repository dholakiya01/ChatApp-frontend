import axiosInstance from '@/app/_api/interseptor';
import { Getmessages } from '@/app/_api/messages';
import { setMessages } from '@/redux/messageSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const UseGetmessages = async () => {
    const { selectedUser } = useSelector(store => store.user);
    const token = useSelector((state)=>state.user.token)
    const dispatch = useDispatch();
    const [isLoading,SetLoading] = useState(false)    

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await Getmessages(selectedUser,token)
                dispatch(setMessages(response?.data || ''))
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        }
        fetchMessages()
    }, [selectedUser])
}

export default UseGetmessages