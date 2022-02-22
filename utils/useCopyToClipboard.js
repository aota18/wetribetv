import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { useEffect } from 'react/cjs/react.development';

export default function useCopyToClipboard(resetInterval = null){

    const [isCopied, setCopied] = useState(false);

    const handleCopy = useCallback((text) => {
        if(typeof text === 'string' || typeof text =='nubmer'){
            //copy
            copy(text.toString());
            setCopied(true);
        }
        else {
            // don't copy
            setCopied(false);
            console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`);

        }
    }, []);

    useEffect(() => {
        let timeout;
        if(isCopied && resetInterval){
            timeout = setTimeout(() => setCopied(false), resetInterval);
        }

        return () => {
            clearTimeout(timeout)
;        }
    }, [isCopied, resetInterval])

    return [isCopied, handleCopy];
}

