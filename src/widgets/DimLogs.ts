// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimLogs.ts - tismet

//import theme from '@dojo/themes/dojo'
import { v, w } from '@dojo/framework/widget-core/d';
import { Link } from '@dojo/framework/routing/Link';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { TsInfo } from '../interfaces';
import { formatDuration, formatEng } from './utils';
import * as css from '../styles/dimDirList.m.css'

export class DimLogs extends WidgetBase<TsInfo> {
    protected renderItems() {
        let info = this.properties.info || {};
        let now = Date.parse(info.now);
        let out = [ v('tr', {classes: css.head}, 
            [ v('th', ['Name']), v('th', ['Size']), v('th', ['Age']) ]) ];
        for (let i in info.files) {
            let f = info.files[i];
            out.push(v('tr', {}, [
                v('td', {classes: css.name}, [
                    w(Link, {to: 'dimLogTail', params: {file: f.name} }, [f.name]),
                ]),
                v('td', {classes: css.value}, [formatEng(f.size)]),
                v('td', {classes: css.value}, [
                    formatDuration(now - Date.parse(f.mtime))
                ]),
            ]));
        }
        return out;
    }
	protected render() {
        return v('div', {classes: css.root}, [
            v('h2', {}, ['Log Files']),
            v('table', {}, this.renderItems()),
        ]);
	}
}
