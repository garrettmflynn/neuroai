import { randn } from "./utils.js";

const defaultSize = Math.pow(2, 7) // 128. Hardcoded in the model for now

export const generate = (size = defaultSize) => Array.from({ length: size }, () => randn());

export const interpolate = (v1, v2, factor) => v1.map((v, i) => v * (1 - factor) + v2[i] * factor)