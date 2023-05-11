import { randn } from "./utils.js";

const defaultSize = 128

export function generate(size = defaultSize) {
    const latentVector = new Float32Array(size);
    for (let i = 0; i < size; i++) latentVector[i] = randn();
    return latentVector;
}

export function interpolate(v1, v2, factor) {
    const result = new Float32Array(v1.length);
    for (let i = 0; i < v1.length; i++) result[i] = v1[i] * (1 - factor) + v2[i] * factor;
    return result;
}