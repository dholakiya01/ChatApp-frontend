"use client"
import React, { useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/messageSlice";
import { SendIcon } from 'lucide-react';
import { Sendmessage } from '@/app/_api/messages';
import toast from 'react-hot-toast';

const SendInput = () => {

  const [message, setMessage] = useState('');
  const dispatch = useDispatch()

  const { selectedUser, token } = useSelector((store) => store.user);
  const { messages } = useSelector(store => store.message);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Sendmessage(selectedUser, message, token);
      // let msg = messages
      dispatch(setMessages([...messages, response.data.newmessage]))
    } catch (e) {
      toast.error(error?.response?.data || error?.response?.data?.msg || 'Something went wrong')
    }
    setMessage('');
  }

  return (
    <div>
      <form className='px-4 mt-2' onSubmit={onSubmithandler} >
        <div className='w-full relative'>
          <div className='fixed bottom-10 w-80'>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Send a message....' className='border text-sm rounded-lg block w-full text-white p-3' />
          <button type="submit" className='absolute flex inset-y-0 end-0 items-center'><SendIcon color='green' className='mx-3' /></button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SendInput