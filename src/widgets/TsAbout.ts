// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// TsAbout.ts - tismet

//import theme from '@dojo/themes/dojo'
import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { TsInfo } from '../interfaces';

import * as css from '../styles/tsInfo.m.css'

export class TsAbout extends WidgetBase<TsInfo> {
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
    protected renderDirs(dirs: any[]) {
        let out = [];
        out.push(v('tr', {}, [
            v('th', []),
            v('th', ['Path']),
            v('th', ['Total']),
            v('th', ['Used']),
        ]));
        for (let d of dirs) {
            let pct = 100 - 100 * d.value.spaceAvail / d.value.spaceTotal;
            out.push(v('tr', {}, [
                v('td', {}, [d.name]),
                v('td', {}, [d.value.path]),
                v('td', {}, [d.value.spaceTotal.toLocaleString()]),
                v('td', {}, [pct.toLocaleString() + '%']),
            ]));
        }
        return out;
    }
    protected renderLists() {
        const { info = [] } = this.properties;
        let out = [];
        if (info.hasOwnProperty('version')) {
            out.push(v('h2', {key: 0}, ['Execution']));
            out.push(v('table', {key: 0}, this.renderItems([
                {name: 'Product Version', value: info.version},
                {name: 'Start Time', value: info.startTime},
                {name: 'Root directory', value: info.rootDir},
                {name: 'System account',
                    value: info.account[0].name + '@' + info.account[0].domain},
                {name: 'Running as a service', value: info.service.toString()},
            ])));
            out.push(v('h2', {key: 1}, ['Disk Space']));
            out.push(v('table', {key: 1}, this.renderDirs([
                {name: 'Data', value: info.dataDir},
                {name: 'Logs', value: info.logDir},
                {name: 'Crashes', value: info.crashDir},
            ])));
        }
        return out;
    }
	protected render() {
        return v('div', {classes: css.root}, this.renderLists());
	}
}
