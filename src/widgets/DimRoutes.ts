// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimRoutes.ts - tismet

//import theme from '@dojo/themes/dojo'
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { TsInfo } from '../interfaces';

import * as css from '../styles/dimRoutes.m.css'

export class DimRoutes extends WidgetBase<TsInfo> {
    protected renderItems() {
        const { info = [] } = this.properties;
        let out = [ v('tr', {key: -1, classes: css.head}, 
            [ v('th', ['Matched']), v('th', ['Methods']), v('th', ['Path']) ]) ];
        for (let i = 0; i < info.length; ++i) {
            let r = info[i];
            out.push(v('tr', {key: i, classes: css.row}, [
                v('td', {classes: css.number}, [r.matched.toLocaleString()]),
                v('td', {classes: css.text}, [r.methods.join(' ')]),
                v('td', {classes: css.text}, [r.path]),
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
