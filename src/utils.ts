function getMin(a: number, b: number) {
    return a < b ? a : b;
}

function getMax(a: number, b: number) {
    return a > b ? a : b;
}

function map(x: number, inMin: number, inMax: number, outMin: number, outMax: number, step: number=1) {
    const mapped = (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    return Math.round(mapped / step) * step;
}

export { getMin, getMax, map };