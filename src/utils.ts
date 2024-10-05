function max(a: number, b: number) {
    return a > b ? a : b;
}

function min(a: number, b: number) {
    return a < b ? a : b;
}

function map(x: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export { max, min, map };