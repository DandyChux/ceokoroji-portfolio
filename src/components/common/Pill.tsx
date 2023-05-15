import React from 'react'

type PillProps ={ 
    label: string;
}

const Pill: React.FC<PillProps> = ({ label }) => {
    return (
        <span className='inline-flex items-center px-3 py-1 m-1 text-sm font-medium text-white bg-gray-800 rounded-full'>
            {label}
        </span>
    )
}

export default Pill;