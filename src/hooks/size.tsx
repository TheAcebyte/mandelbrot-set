import { useState, useEffect } from 'react';

function useSize(ref: any) {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            setSize({ width: ref.current.clientWidth, height: ref.current.clientHeight });
        }

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

export default useSize;