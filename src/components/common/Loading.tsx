import React from 'react'

const Loading: React.FC = () => (
    <div className='absolute inline-flex items-center'>
        <div className='w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-primary' />
    </div>
)

export default Loading;