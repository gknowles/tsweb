// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// Views.ts - tismet

import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Toolbar from '@dojo/widgets/toolbar';

import { CountersOutlet } from '../outlets';

import * as css from '../styles/toolbar.m.css'
let theme = { '@dojo/widgets/toolbar': css };

export default class Views extends WidgetBase {
	protected render() {
		return v('div', {}, [
            w(Toolbar, {
                theme,
                heading: 'Tismet',
                collapseWidth: 720,
            }, [
                v('a', { classes: css.tab, href: '/#about' }, ['About']),
                v('a', { classes: css.tab, href: '/#protos' }, ['Protocol']),
                v('a', { classes: css.tab, href: '/#metrics' }, ['Metric']),
                v('a', { classes: css.tab, href: '/#backups' }, ['Backup']),
                v('a', { classes: css.tab, href: '/#functs' }, ['Function']),
                v('a', { classes: css.tab, href: '/#counters' }, ['Counter']),
                v('a', { classes: css.tab, href: '/#crashes' }, ['Crash']),
                v('a', { classes: css.tab, href: '/#logs' }, ['Log']),
                v('a', { classes: css.tab, href: '/#sockets' }, ['Socket']),
                v('a', { classes: css.tab, href: '/#routes' }, ['Route']),
            ]),
            v('div', { styles: {margin: '48px 0px'}}, [
                w(CountersOutlet, {}),
            ])
        ]);
	}
}
