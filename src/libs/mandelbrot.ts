import { mapFloat } from './utils.ts';

function drawMandelbrot(canvas: HTMLCanvasElement, maxIterations: number, colors: string[], scale: number, centerX: number, centerY: number) {
    const scaleX = canvas.width > canvas.height ? scale * canvas.width / canvas.height : scale;
    const scaleY = canvas.height > canvas.width ? scale * canvas.height / canvas.width : scale;

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const originX = centerX + mapFloat(x, 0, canvas.width, -scaleX, scaleX);
            const originY = centerY + mapFloat(y, 0, canvas.height, -scaleY, scaleY);
            
            const iteration = getEscapeTime(originX, originY, maxIterations);
            const color = getColor(iteration, maxIterations, colors);
            drawPoint(canvas, x, y, color);
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

export { drawMandelbrot, resizeCanvas };