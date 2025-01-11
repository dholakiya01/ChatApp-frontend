'use client'
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthuser, setOtherUser, setselectedUser } from '@/redux/userSlice';

const Sidebar = () => {

    const router = useRouter();
    const {otherUsers} = useSelector(store => store.user);
    const dispatch = useDispatch()

    const [Search, setSearch] = useState('')

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        router.push('/login');
        dispatch(setAuthuser(null));
        dispatch(setselectedUser(null))
        toast.success("Logout successfully")
    };

    const onSearchhandler = (e) =>{
        e.preventDefault();
        const ConversationUser = otherUsers.find((user)=>user.fullName.toLowerCase(user).includes(Search.toLowerCase()));
        if(ConversationUser){
            dispatch(setOtherUser([ConversationUser]))
        }else{
            toast.error('User not found')
        }
        setSearch('');
    }

    return (
        <div className='border-r border-slate-800 p-4 flex flex-col'>
            <form action="" className='flex items-center gap-4' onSubmit={onSearchhandler}>
                <input value={Search} onChange={(e)=>setSearch(e.target.value)} type="text" className='input input-bordered rounded-md' placeholder='Search...' />
                <button type='submit' className='btn bg-zinc-700'><FaSearch size="24px" /></button>
            </form>
            <div className="divider px-3"></div>
            <OtherUsers />
            <div className='mt-2'>
                <button  className='btn btn-sm' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Sidebar