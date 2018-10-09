// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimRoutes.ts - tismet

//import theme from '@dojo/themes/dojo'
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { DimRoutesItem } from '../interfaces';

import * as css from '../styles/dimRoutes.m.css'

export interface DimRoutesProperties extends DimRoutesItem {
    getRoutes: (opts: object) => void;
}
export class DimRoutes extends WidgetBase<DimRoutesProperties> {
    protected renderItems() {
        const { items = [] } = this.properties;
        let out = [ v('tr', {classes: css.head}, 
            [ v('th', ['Matched']), v('th', ['Methods']), v('th', ['Path']) ]) ];
        for (let i of items) {
            out.push(v('tr', {classes: css.row}, [
                v('td', {classes: css.number}, [i.matched.toLocaleString()]),
                v('td', {classes: css.text}, [i.methods.join(' ')]),
                v('td', {classes: css.text}, [i.path]),
            ]));
        }
        return out;
    }
	protected render() {
        return v('div', {classes: css.root}, [
            v('h2', {}, ['Routes - Registered URLs']),
            v('table', {}, this.renderItems()),
        ]);
	}
}
