import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { setSocket } from '@/redux/socketSlice';
import { setOnlineusers } from '@/redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const Homepage = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);

  useEffect(() => {
    if (authUser) {
      const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_PORT}`, {
        query: {
          userId: authUser?._id
        }
      })
      dispatch(setSocket(socket));
      socket.on('getUseronline', (onlineUser) => {
        dispatch(setOnlineusers(onlineUser))
      });
      return () => socket.close()
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <div className='flex md:h-screen lg:h-screen h-screen rounded-lg overflow-hidden bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />
      {/* <MessageContainer /> */}
    </div>
  )
}

export default Homepage