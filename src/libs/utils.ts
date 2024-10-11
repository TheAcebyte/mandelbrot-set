function getMin(a: number, b: number) {
    return a < b ? a : b;
}

function getMax(a: number, b: number) {
    return a > b ? a : b;
}

function mapInt(x: number, inMin: number, inMax: number, outMin: number, outMax: number, step: number=1) {
    const mappedInt = (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    return Math.round(mappedInt / step) * step
}

function mapFloat(x: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export { getMin, getMax, mapInt, mapFloat };