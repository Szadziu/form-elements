export function min({ min, msg, v }: { min: number; v: string; msg: string }) {
    return v.length < min ? msg : '';
}
