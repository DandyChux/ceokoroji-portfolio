import React, { useState } from 'react';
import { Navbar } from '@modules/Navbar/Navbar';

interface Props {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Navbar />
            {props.children}
            {/* Maybe add a footer? */}
        </>
    );
}