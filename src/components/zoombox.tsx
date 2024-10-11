
import { useEffect, useRef } from 'react';
import { mapFloat } from '../libs/utils.ts';
import './zoombox.css';

type ZoomBoxProps = {
    canvasRef: any,
    zoomGetter: any,
    scaleGetter: any,
    scaleSetter: any,
    defaultScale: number,
    originSetter: any,
    originGetter: any,
    defaultOrigin: { x: number, y: number },
}

function ZoomBox({ canvasRef, zoomGetter, scaleGetter, scaleSetter, defaultScale, originSetter, originGetter, defaultOrigin }: ZoomBoxProps) {
    const active = useRef<boolean>(false);
    const toggleActive = () => active.current = !active.current;
    const zoomInRef = useRef<HTMLElement>(null);

    const toggleZoom = () => {
        const fontSize = active.current ? '2.5rem' : '2.75rem';
        const color = active.current ? 'var(--grey-200)' : 'var(--grey-50)';
        const cursor = active.current ? 'default' : 'zoom-in';

        zoomInRef.current!.style.fontSize = fontSize;
        zoomInRef.current!.style.color = color;
        document.body.style.cursor = cursor;

        toggleActive();
    }

    const resetZoom = () => {
        originSetter(defaultOrigin);
        scaleSetter(defaultScale);
    }

    useEffect(() => {
        const canvas = canvasRef.current!;
        const clickHandler = (e: any) => {
            if (active.current) {
                const scale = scaleGetter.current;
                const origin = originGetter.current;
                const zoomMultiplier = zoomGetter.current;

                const scaleX = canvas.width > canvas.height ? scale * canvas.width / canvas.height : scale;
                const scaleY = canvas.height > canvas.width ? scale * canvas.height / canvas.width : scale;

                const x = origin.x + mapFloat(e.x, 0, canvas.width, -scaleX, scaleX);
                const y = origin.y + mapFloat(e.y, 0, canvas.height, -scaleY, scaleY);
                
                originSetter({ x: x, y: y });
                scaleSetter(scale * zoomMultiplier);
            }
        }

        canvas.addEventListener('click', clickHandler);
        return () => canvas.removeEventListener('click', clickHandler);
    }, []);

    return(
        <div className="zoombox">
            <i className='bx bx-zoom-in' ref={zoomInRef} onClick={toggleZoom}></i>
            <i className='bx bx-fullscreen' onClick={resetZoom}></i>
        </div>
    )
}

export default ZoomBox;