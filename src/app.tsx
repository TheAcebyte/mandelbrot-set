import { useState, useEffect, useRef } from 'react';
import useSize from './hooks/size.tsx'
import { drawMandelbrot, resizeCanvas } from './libs/mandelbrot.ts';
import Settings from './components/settings.tsx';
import './app.css';

function App() {
    const [maxIterations, setMaxIterations] = useState(0);
    const [colors, setColors] = useState([]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {width, height} = useSize(wrapperRef);
    
    useEffect(() => {
        resizeCanvas(canvasRef.current!, width, height);
        drawMandelbrot(canvasRef.current!, maxIterations, colors);
    }, [width, height]);

    return (
        <div className="wrapper" ref={wrapperRef}>
            <Settings maxIterations={maxIterations} setMaxIterations={setMaxIterations} colors={colors} setColors={setColors}/>
            <canvas id="canvas" ref={canvasRef}></canvas>
        </div>
    );
}

export default App;