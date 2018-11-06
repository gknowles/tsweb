// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimCrashes.ts - tismet

import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { baseUrl } from '../config';
import { TsInfo } from '../interfaces';
import { formatDuration, formatEng } from './utils';
import * as css from '../styles/dimDirList.m.css'

export class DimCrashes extends WidgetBase<TsInfo> {
    protected renderItems() {
        let info = this.properties.info || {};
        let now = Date.parse(info.now);
        let out = [ v('tr', {classes: css.head}, 
            [ v('th', ['Name']), v('th', ['Size']), v('th', ['Age']) ]) ];
        if (info.files === undefined) 
            return out;
        info.files.sort((a: any, b: any) => { 
            if (a.mtime > b.mtime) return -1;
            if (a.mtime < b.mtime) return 1;
            return 0;
        });
        for (let i in info.files) {
            let f = info.files[i];
            out.push(v('tr', {}, [
                v('td', {classes: css.name}, [
                    v('a', {href: baseUrl + '/srv/crashes/' + f.name}, [f.name]),
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
            v('h2', {}, ['Crash Dumps']),
            v('table', {}, this.renderItems()),
        ]);
	}
}
