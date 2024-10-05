import { useState, useEffect, useRef } from 'react';
import useWindow from './hooks/window.tsx';
import { min, map } from './utils.ts';
// import Settings from './components/settings.tsx';
import './app.css';

const maxIterations = 20;
const colors = [    
    "#421e0f",
    "#19071a",
    "#09012f",
    "#040449",
    "#000764",
    "#0c2c8a",
    "#1852b1",
    "#397dd1",
    "#86b5e5",
    "#d3ecf8",
    "#f1e9bf",
    "#f8c95f",
    "#ffaa00",
    "#cc8000",
    "#995700",
    "#6a3403"
]

function drawMandelbrot(canvas: HTMLCanvasElement, maxIterations: number, colors: string[]) {
    canvas.style.backgroundColor = getColor(2, maxIterations, colors);
    const size = min(canvas.width, canvas.height);

    const centerWidth = size == canvas.height ? (canvas.width >> 1) - (size >> 1) : 0;
    const centerHeight = size == canvas.width ? (canvas.height >> 1) - (size >> 1) : 0;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const originX = map(x, 0, size, -2, 2);
            const originY = map(y, 0, size, -2, 2);
            
            const iteration = getEscapeTime(originX, originY, maxIterations);
            const color = getColor(iteration, maxIterations, colors);
            drawPoint(canvas, x + centerWidth, y + centerHeight, color);
        }
    }
}

function getEscapeTime(originX: number, originY: number, maxIterations: number) {
    let i = 1;
    let x = 0, y = 0;
    let x2 = 0, y2 = 0;

    while (x2 + y2 <= 4 && i++ <= maxIterations) {
        y = 2 * x * y + originY;
        x = x2 - y2 + originX; 

        x2 = x * x;
        y2 = y * y;
    }

    return i;
}

function getColor(iteration: number, maxIterations: number, colors: string[]) {
    if (iteration < maxIterations) {
        return colors[iteration % colors.length];
    }

    return '#000000';
}

function drawPoint(canvas: HTMLCanvasElement, x: number, y: number, color: string) {
    const ctx = canvas.getContext('2d');
    ctx!.fillStyle = color;
    ctx!.fillRect(x, y, 1, 1);
}

function resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
    canvas.width = width;
    canvas.height = height;
}

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, height] = useWindow();

    useEffect(() => {
        resizeCanvas(canvasRef.current!, width, height);
        drawMandelbrot(canvasRef.current!, maxIterations, colors);
    }, [width, height]);

    return (
        <>
            <canvas id="canvas" ref={canvasRef}></canvas>
        </>
    );
}

export default App;