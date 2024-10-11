import { useState, useEffect, useRef } from 'react';
import useSize from './hooks/size.tsx'
import { drawMandelbrot, resizeCanvas } from './libs/mandelbrot.ts';
import Settings from './components/settings.tsx';
import ZoomBox from './components/zoombox.tsx';
import './app.css';

const redrawDelay = 100;
const defaultScale = 2;
const defaultOrigin = { x: 0, y: 0 };

function App() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {width, height} = useSize(wrapperRef);

    const [maxIterations, setMaxIterations] = useState(0);
    const [zoomMultiplier, setZoomMultiplier] = useState(0);
    const [colors, setColors] = useState([]);
    const [scale, setScale] = useState(defaultScale);
    const [origin, setOrigin] = useState({ x: 0, y: 0 });

    const scaleRef = useRef<number>();
    const originRef = useRef<{x: number, y: number}>();
    const zoomMultiplierRef = useRef<number>();
    scaleRef.current = scale;
    originRef.current = origin;
    zoomMultiplierRef.current = zoomMultiplier;
    
    useEffect(() => {
        resizeCanvas(canvasRef.current!, width, height);
        setTimeout(() => {
            if (canvasRef.current!.clientWidth == width && canvasRef.current!.clientHeight == height) {
                drawMandelbrot(canvasRef.current!, maxIterations, colors, scale, origin.x, origin.y);
            }
        }, redrawDelay);
    }, [width, height]);
    
    useEffect(() => {
        drawMandelbrot(canvasRef.current!, maxIterations, colors, scale, origin.x, origin.y);
    }, [maxIterations, colors, scale]);

    return (
        <div className="wrapper" ref={wrapperRef}>
            <Settings iterGetter={maxIterations} iterSetter={setMaxIterations} colorGetter={colors} colorSetter={setColors} zoomGetter={zoomMultiplier} zoomSetter={setZoomMultiplier}/>
            <canvas id="canvas" ref={canvasRef}></canvas>
            <ZoomBox canvasRef={canvasRef} zoomGetter={zoomMultiplierRef} scaleGetter={scaleRef} scaleSetter={setScale} defaultScale={defaultScale} originSetter={setOrigin} originGetter={originRef} defaultOrigin={defaultOrigin}/>
        </div>
    );
}

export default App;