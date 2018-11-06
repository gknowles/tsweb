// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// widgets/utils.ts - tismet

function joinDur(a: number, at: string, b: number, bt: string): string {
    if (a) {
        if (b) {
            return a.toString() + at + ' ' + b.toString() + bt;
        } else {
            return a.toString() + at;
        }
    } else {
        return b.toString() + bt;
    }
}

export function formatDuration(elapsed: number): string {
    let ms = elapsed % 1000;
    let s = Math.floor(elapsed / 1000);
    let m = Math.floor(s / 60);
    s -= m * 60;
    if (!m)
        return joinDur(s, 's', ms, 'ms');
    let h = Math.floor(m / 60);
    m -= h * 60;
    if (!h)
        return joinDur(m, 'm', s, 's');
    let d = Math.floor(h / 24);
    h -= d * 24;
    if (!d)
        return joinDur(h, 'h', m, 'm');
    let w = Math.floor(d / 7);
    d -= w * 7;
    if (!w)
        return joinDur(d, 'd', h, 'h');
    return joinDur(w, 'w', d, 'd');
}

export function formatEng(n: number): string {
    if (!n) 
        return "0";
    let e = 0;
    let v = n;
    if (n >= 1000) {
        e = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
        v = n / Math.pow(1000, e);
    }
    let out = v.toFixed(3);
    if (e)
        out += " kMGTPEZY"[e];
    return out;
}
