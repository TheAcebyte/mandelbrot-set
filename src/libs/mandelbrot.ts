import { getMin, mapFloat } from './utils.ts';

function drawMandelbrot(canvas: HTMLCanvasElement, maxIterations: number, colors: string[]) {
    canvas.style.backgroundColor = getColor(2, maxIterations, colors);
    const size = getMin(canvas.width, canvas.height);

    const centerWidth = size == canvas.height ? (canvas.width >> 1) - (size >> 1) : 0;
    const centerHeight = size == canvas.width ? (canvas.height >> 1) - (size >> 1) : 0;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const originX = mapFloat(x, 0, size, -2, 2);
            const originY = mapFloat(y, 0, size, -2, 2);
            
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

export { drawMandelbrot, resizeCanvas, drawPoint };