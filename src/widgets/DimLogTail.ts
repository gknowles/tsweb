// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimLogTail.ts - tismet

import { v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { TsInfo } from '../interfaces';
import { formatDuration, formatEng } from './utils';
import * as css from '../styles/dimDirList.m.css'

export class DimLogTail extends WidgetBase<TsInfo> {
	protected render() {
        let info = this.properties.info || {};
        let now = Date.parse(info.now);
        return v('div', {classes: css.root}, [
            v('h2', {}, ['File: ' + info.name]),
            v('dl', {}, [
                v('dt', ['Last Modified']),
                v('dd', [
                    info.mtime, 
                    ' (', formatDuration(now - Date.parse(info.mtime)), ')',
                ]),
                v('dt', ['Size']),
                v('dd', [formatEng(info.size)]),
                v('dt', ['Limit']),
                v('dd', ['Last ', info.limit.toLocaleString(), ' lines']),
            ]),
            v('h3', ['Content']),
            v('p', {style: ['white-space: pre']}, [info.lines.join('\n')]),
        ]);
	}
}
