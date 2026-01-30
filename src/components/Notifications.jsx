import { clearNotification, setNotifications } from '@/redux/messageSlice';
import { socket } from '@/utils/socket';
import { Bell } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Notifications = ({ palette }) => {
    const { notification } = useSelector((state) => state.message)
    const dispatch = useDispatch();
    socket.on('notification', (msg) => {
        dispatch(setNotifications(msg))
    });

    const handleClearNotification = ()=>{
        dispatch(clearNotification());
    }

    return (
        <div className='bg-red-400 p-4'>
            <Bell onClick={handleClearNotification} size={18} color={palette.dark} />
            <span className='text-xs'>{notification}</span>
        </div>
    )
}

export default Notifications