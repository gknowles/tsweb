// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// TsFuncts.ts - tismet

import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import * as css from '../styles/tsFuncts.m.css'

export interface TsFunctsProperties {
    info: any;
    date: Date;
    getInfo: (opts: object) => void;
}
export class TsFuncts extends WidgetBase<TsFunctsProperties> {
    protected renderFunct(f: any) {
        let out = [
            v('span', {classes: css.name}, [f.name]),
            '(',
        ];
        for (let a of f.args) {
            out.push(
                v('span', {classes: css.argType}, [a.type]),
                ' ',
                v('span', {classes: css.argName}, [a.name]),
            );
            if (a.multiple)
                out.push('[]');
            if (!a.require)
                out.push(' = ', v('span', {classes: css.argDefault}, ['{}']));
            out.push(', ');
        }
        out.pop();
        out.push(')');
        return out;
    }
    protected renderFuncts(functs: any[]) {
        let out = [];
        functs.sort((a,b) => a.name.localeCompare(b.name));
        for (let f of functs) {
            out.push(v('tr', {key: f.name}, [
                v('td', {}, this.renderFunct(f))
            ]));
        }
        return out;
    }
    protected renderGroups() {
        let functs = this.properties.info;
        let groups = {} as any;
        for (let k of functs.keys()) {
            let f = functs[k];
            if (!groups.hasOwnProperty(f.group))
                groups[f.group] = [];
            groups[f.group].push(f);
        }
        let out = [];
        for (let k of Object.keys(groups).sort()) {
            out.push(v('h2', {key: k}, [k]));
            out.push(v('table', {key: k}, this.renderFuncts(groups[k])));
        }
        return out;
    }
	protected render() {
        return v('div', {classes: css.root}, this.renderGroups());
	}
}
