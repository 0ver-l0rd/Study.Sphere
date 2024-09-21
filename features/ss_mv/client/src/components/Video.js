import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
export default function Video({ srcObject, ...props }) {
    const refVideo = useRef(null);
    useEffect(() => {
        if (!refVideo.current)
            return;
        refVideo.current.srcObject = srcObject;
    }, [srcObject]);
    return _jsx("video", { ref: refVideo, ...props });
}
