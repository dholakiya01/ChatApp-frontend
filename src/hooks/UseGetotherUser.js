import axiosInstance from '@/app/_api/interseptor';
import { finduser } from '@/app/_api/user';
import { setOtherUser } from '@/redux/userSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const UseGetotherUser = () => {

  const dispatch = useDispatch();
  const token = useSelector((state)=>state.user.token);

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        axios.defaults.withCredentials = true
        const response = await finduser(token)
        dispatch(setOtherUser(response?.data?.data));
      } catch (err) {
        toast.error(err?.response?.data?.msg || 'Something went wrong');
      }
    }
    fetchOtherUser()
  }, [])
}

export default UseGetotherUser