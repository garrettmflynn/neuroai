export function randn() {
    const u1 = Math.random();
    const u2 = Math.random();
    return  Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}