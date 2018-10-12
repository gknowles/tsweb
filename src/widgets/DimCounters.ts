// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimCounters.ts - tismet

//import theme from '@dojo/themes/dojo'
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { TsInfo } from '../interfaces';

import * as css from '../styles/dimCounters.m.css'

export class DimCounters extends WidgetBase<TsInfo> {
    protected renderItems() {
        let info = this.properties.info || {};
        let out = [ v('tr', {classes: css.head}, 
            [ v('th', ['Value']), v('th', ['Name']) ]) ];
        for (let name in info) {
            out.push(v('tr', {}, [
                v('td', {classes: css.value}, [
                    info[name].toLocaleString(
                        undefined, 
                        {maximumFractionDigits: 3}
                    )
                ]),
                v('td', {classes: css.name}, [name]),
            ]));
        }
        return out;
    }
	protected render() {
        return v('div', {classes: css.root}, [
            v('h2', {}, ['Performance Counters']),
            v('table', {}, this.renderItems()),
        ]);
	}
}
