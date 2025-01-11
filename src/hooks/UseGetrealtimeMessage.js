import { setMessages } from '@/redux/messageSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UseGetrealTimeMessage = () => {

  const dispatch = useDispatch();
  const { socket } = useSelector(store => store.socket);
  const { messages } = useSelector(store => store.message);
  const { selectedUser } = useSelector(store => store.user)


  useEffect(() => {
    socket?.on('newMessage', (newmessage) => {
      dispatch(setMessages([...messages, newmessage]))
    })
  }, [socket, setMessages, messages,selectedUser])
}

export default UseGetrealTimeMessage