import { setselectedUser } from '@/redux/userSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const OtherUser = ({ user,searchuser }) => {

    const dispatch = useDispatch();
    const { selectedUser, onlineUser } = useSelector(store => store.user);
    const isOnline = onlineUser?.includes(user._id)

    const selectedUserhandler = (user) => {
        dispatch(setselectedUser(user))
    }

    return (
        <>
            <div onClick={() => selectedUserhandler(user)} className={`${selectedUser?._id === user?._id ? "bg-slate-800" : ""} flex gap-2 items-center text-white hover:bg-slate-800 cursor-pointer py-3`}>
                <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="profilePhoto" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-b gap-3'>
                        <p>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser