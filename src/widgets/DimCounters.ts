// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimCounters.ts - tismet

//import theme from '@dojo/themes/dojo'
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { DimCountersItem } from '../interfaces';

import * as css from '../styles/dimCounters.m.css'

export interface DimCountersProperties extends DimCountersItem {
    getCounters: (opts: object) => void;
}
export class DimCounters extends WidgetBase<DimCountersProperties> {
    protected renderItems() {
        const { items = [] } = this.properties;
        let out = [ v('tr', {classes: css.head}, 
            [ v('th', ['Value']), v('th', ['Name']) ]) ];
        for (let i of items) {
            out.push(v('tr', {}, [
                v('td', {classes: css.value}, [
                    i.value.toLocaleString(
                        undefined, 
                        {maximumFractionDigits: 3}
                    )
                ]),
                v('td', {classes: css.name}, [i.name]),
            ]));
        }
        return out;
    }
	protected render() {
        return v('div', {classes: css.root}, [
            v('h2', {}, ['Performance counters']),
            v('table', {}, this.renderItems()),
        ]);
	}
}
