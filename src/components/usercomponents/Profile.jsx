import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

export default function SizeAvatars() {
    const userdata = useSelector((state) => state.user.authUser);
    return (
        <Stack direction="row" spacing={2}>
            <span>
                <Avatar className='border-4 border-green-600'
                    alt={userdata?.fullName.toUpperCase()}
                    src={userdata?.profilePhoto}
                    sx={{ width: 56 }}
                />
                <p className='pt-3 font-bold'>{userdata?.fullName?.charAt(0).toUpperCase() + userdata?.fullName.slice(1)}</p>
            </span>

        </Stack>
    );
}