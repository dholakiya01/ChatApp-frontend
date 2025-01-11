"use client"
import { IoMdSend } from "react-icons/io";
import React, { useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/messageSlice";

const SendInput = () => {

  const [message, setMessage] = useState('');
  const dispatch = useDispatch()

  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector(store => store.message);
  // console.log(messages, "msg res 14");

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message/send/${selectedUser?._id}`, { message }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        withCredentials: true
      });
      console.log(response, "res");
      // let msg = messages
      console.log('messages:', response?.data?.newmessage.message);
      dispatch(setMessages([...messages,response.data.newmessage]))
    } catch (e) {
      console.error(e);
    }
    setMessage('');
  }

  return (
    <div>
      <form className='px-4 mt-2' onSubmit={onSubmithandler}>
        <div className='w-full relative'>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Send a message....' className='border text-sm rounded-lg block w-full text-white p-3' />
          <button type="submit" className='absolute flex inset-y-0 end-0 items-center'><IoMdSend color='green' className='mx-3' /></button>
        </div>
      </form>
    </div>
  )
}

export default SendInput