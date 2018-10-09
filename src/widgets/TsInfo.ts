// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// TsInfo.ts - tismet

//import theme from '@dojo/themes/dojo'
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { InfoTable } from '../interfaces';

import * as css from '../styles/tsInfo.m.css'

export interface TsInfoProperties extends InfoTable {
    getInfo: (opts: object) => void;
}
export class TsInfo extends WidgetBase<TsInfoProperties> {
    protected renderItems(items: any[]) {
        let out = [];
        for (let i of items) {
            out.push(v('tr', {}, [
                v('td', {classes: css.name}, [i.name]),
                v('td', {classes: css.value}, [i.value]),
            ]));
        }
        return out;
    }
    protected renderLists() {
        const { lists = [] } = this.properties;
        let out = [];
        for (let list of lists) {
            out.push(v('h2', {}, [list.title]));
            out.push(v('table', {}, this.renderItems(list.items)));
        }
        return out;
    }
	protected render() {
        return v('div', {classes: css.root}, this.renderLists());
	}
}
