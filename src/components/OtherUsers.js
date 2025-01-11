
import React from 'react';
import OtherUser from './OtherUser';
import UseGetotherUser from '@/hooks/UseGetotherUser';
import { useSelector } from 'react-redux';

const OtherUsers = () => {

    UseGetotherUser();
    const { otherUsers } = useSelector(store => store.user);
    // console.log(otherUsers, "otherUser");
    if (!otherUsers) {
        return;
    }
    return (
        <div className='overflow-y-scroll flex-1'>
            {
                otherUsers?.map((user) => {
                    // console.log(user, "user >>>>>>>");
                    return <OtherUser key={user._id} user={user} />
                })
            }
        </div>
    )
}

export default OtherUsers