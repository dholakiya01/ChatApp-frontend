import React from 'react'
import SignleMsg from './SignleMsg'
import UseGetmessages from '@/hooks/UseGetmessage'
import { useSelector } from 'react-redux'
import UseGetrealTimeMessage from '@/hooks/UseGetrealtimeMessage'

const Messages = () => {
    UseGetmessages();
    UseGetrealTimeMessage();
    const { messages } = useSelector(store => store.message);
    if (!messages) { return; }
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
               messages &&  messages?.map(({ _id, ...msg }) => (
                    <div key={_id}>
                      <SignleMsg message={msg} />
                    </div>
                  ))
            }
            {/* <SignleMsg/>*/}
        </div>
    )
}

export default Messages