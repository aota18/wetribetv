import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Layout = ({children}) => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home if already logged in
        
    }, [])

    return <div>
        {children}
    </div>
}