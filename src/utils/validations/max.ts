export function max({ v, max, msg }: { max: number; v: string; msg: string }) {
    return v.length > max ? msg : '';
}
