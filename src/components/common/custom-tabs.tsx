'use client'

import React, { useState } from 'react';
import type { Tab } from '~typings/tabs';

interface TabProps {
    tabData: Tab[];
}

export const CustomTabs: React.FC<TabProps> = ({ tabData }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div>
            <div className='flex space-x-3 border-b'>
                {tabData.map((tab, index) => (
                    <button
                        key={index}
                        className={`py-2 border-b-4 transition-colors duration-300 ${
                            index === activeTabIndex
                            ? 'border-accent'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTabIndex(index)}>
                            {tab.label}
                    </button>
                ))}
            </div>
            {/* Show active tab content */}
            <div className='py-4'>
                <div>{tabData[activeTabIndex]?.content}</div>
            </div>
        </div>
    )
}