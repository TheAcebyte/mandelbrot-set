import { useState, useEffect, useRef } from 'react';
import useSize from './hooks/size.tsx'
import { drawMandelbrot, resizeCanvas } from './libs/mandelbrot.ts';
import Settings from './components/settings.tsx';
import './app.css';

function App() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {width, height} = useSize(wrapperRef);

    const [maxIterations, setMaxIterations] = useState(0);
    const [colors, setColors] = useState([]);
    
    useEffect(() => {
        resizeCanvas(canvasRef.current!, width, height);
        drawMandelbrot(canvasRef.current!, maxIterations, colors);
    }, [width, height]);
    
    useEffect(() => {
        drawMandelbrot(canvasRef.current!, maxIterations, colors);
    }, [maxIterations, colors]);

    return (
        <div className="wrapper" ref={wrapperRef}>
            <Settings iterGetter={maxIterations} iterSetter={setMaxIterations} colorGetter={colors} colorSetter={setColors}/>
            <canvas id="canvas" ref={canvasRef}></canvas>
        </div>
    );
}

export default App;