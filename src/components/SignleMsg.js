import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const SignleMsg = ({ message }) => {
    // console.log(message,"sadsad");
    const scroll = useRef();
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message]);
    const { selectedUser } = useSelector(store => store.user);
    const displayDateTime = format(new Date(message.createdAt), 'dd-MMMM-yyyy HH:mm');

    return (
        <div>
            <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={authUser?._id === message?.senderId ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                    </div>
                </div>
                <div className="chat-header">
                    {authUser?._id === message?.senderId ? authUser?.fullName : selectedUser?.fullName} &nbsp;
                    <time className="text-xs text-white opacity-100">{displayDateTime}</time>
                </div>
                <div className={`${authUser?._id === message?.senderId ? "chat-bubble chat-end-color" : 'chat-bubble chat-start-color'}`}>
                    {message?.message}</div>
            </div>
        </div>
    )
}

export default SignleMsg;