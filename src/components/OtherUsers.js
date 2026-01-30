
import React from 'react';
import OtherUser from './OtherUser';
import UseGetotherUser from '@/hooks/UseGetotherUser';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

const OtherUsers = () => {

    UseGetotherUser();
    const { otherUsers } = useSelector(store => store.user);
    if (!otherUsers) {
        return;
    }
    return (
        <div className='overflow-y-scroll flex-1'>
            {
                otherUsers?.map((user) => {
                    return <OtherUser key={user?._id} user={user} />
                })
            }
        </div>
    )
}

export default OtherUsers