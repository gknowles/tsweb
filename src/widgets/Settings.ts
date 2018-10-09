// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// Settings.ts - tismet

import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { Link } from '@dojo/framework/routing/Link';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import {
    AboutOutlet,
    FunctsOutlet,
    CountersOutlet,
    RoutesOutlet,
} from '../outlets';
import * as css from '../styles/tabs.m.css'

export interface SettingsProperties {
    section: string;
}
@theme(css)
export default class Settings
        extends ThemedMixin(WidgetBase)<SettingsProperties> {
    private _createLink(target: string, title: string) {
        const newSec = title.toLowerCase();
        const sec = this.properties.section;
        let cls = sec == newSec
            ? [this.theme(css.link), this.theme(css.linkActive)]
            : this.theme(css.link);
        return w(Link, {
                key: target,
                to: target,
                params: { section: newSec },
                classes: cls
            },
            [title]
        );
    }
	protected render() {
		return v('div', [
            v('div', {classes: this.theme(css.root)}, [
                v('div', {classes: this.theme(css.container)}, [
                    v('div', {classes: this.theme(css.links)}, [
                        this._createLink('tsAbout', 'About'),
                        this._createLink('dimCounters', 'Counters'),
                        this._createLink('tsFuncts', 'Functions'),
                        this._createLink('dimRoutes', 'Routes'),
                    ])
                ])
            ]),
            v('div', {classes: this.theme(css.main)}, [
                w(AboutOutlet, {}),
                w(FunctsOutlet, {}),
                w(CountersOutlet, {}),
                w(RoutesOutlet, {}),
            ])
        ]);
	}
}
