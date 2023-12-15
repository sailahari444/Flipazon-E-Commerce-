import React from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export const notifySuccess = (props) => {
    toast.success(props, {
        duration: 4000,
        position: 'bottom-right',
        width: '100px',
        style: {
            background: '#ffff',
            color: 'green',
        },
        icon: '✅',
    });
}
export const notifyError = (props) => {
    toast.error(props, {
        duration: 4000,
        position: 'bottom-right',
        style: {
            background: '#ffff',
            color: 'red',
        },
        icon: '❌',
    });
}
export const notifyWarning = (props) => {
    toast.error(props, {
        duration: 4000,
        position: 'bottom-right',
        style: {
            background: '#ffff',
            color: '#8B8000',
        },
        icon: '⚠️',
    });
}
export function Notification() {
    return (
            <Toaster />    
    )
}