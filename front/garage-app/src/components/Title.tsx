import React from 'react';
import PropTypes from 'prop-types';

interface TitleProps {
    title?: string;
    children?: React.ReactNode; 
}

export default function Title({ title, children }: TitleProps) {
    return (
        <div className='d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1'>
            <h1 className='m-0 p-0'>{title}</h1>
            {children}
        </div>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};