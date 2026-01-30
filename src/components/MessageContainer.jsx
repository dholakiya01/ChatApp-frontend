'use client'
import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector } from 'react-redux';

const MessageContainer = () => {

    const { selectedUser, authUser, onlineUser } = useSelector(store => store.user);
    const isOnline = onlineUser?.includes(selectedUser?._id)


    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.replace(/\b\w/g, char => char.toUpperCase());
    }
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col'>
                        <div className='flex gap-2 items-center cursor-pointer py-3 bg-zinc-800 text-white px-2 mx-2'>
                            <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilePhoto == '' ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5mz7JfJwPoJyNZ9Uv3Eo6NZU8AbXqiSCq7Q&s` : selectedUser.profilePhoto} alt="" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-b gap-3'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) :
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center'>

                        <h1>Hi, {capitalizeFirstLetter(authUser?.fullName)}</h1>
                        <h1>Let's Start Conversation</h1>
                    </div>
            }
        </>
    )
}

export default MessageContainer