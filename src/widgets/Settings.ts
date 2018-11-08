// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// Settings.ts - tismet

import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { Link } from '@dojo/framework/routing/Link';
import { Outlet } from '@dojo/framework/routing/Outlet';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import TsAboutContainer from '../containers/TsAboutContainer';
import TsFunctsContainer from '../containers/TsFunctsContainer';
import DimCountersContainer from '../containers/DimCountersContainer';
import DimCrashesContainer from '../containers/DimCrashesContainer';
import DimLogsContainer from '../containers/DimLogsContainer';
import DimLogTailContainer from '../containers/DimLogTailContainer';
import DimRoutesContainer from '../containers/DimRoutesContainer';
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
                        this._createLink('dimCrashes', 'Crashes'),
                        this._createLink('tsFuncts', 'Functions'),
                        this._createLink('dimLogs', 'Logs'),
                        this._createLink('dimRoutes', 'Routes'),
                    ])
                ])
            ]),
            v('div', {classes: this.theme(css.main)}, [
                w(Outlet, {id: 'tsAbout', renderer: (matchDetails: any) => {
                    return w(TsAboutContainer, {});
                }}),
                w(Outlet, {id: 'tsFuncts', renderer: (matchDetails: any) => {
                    return w(TsFunctsContainer, {});
                }}),
                w(Outlet, {id: 'dimCounters', renderer: (matchDetails: any) => {
                    return w(DimCountersContainer, {});
                }}),
                w(Outlet, {id: 'dimCrashes', renderer: (matchDetails: any) => {
                    return w(DimCrashesContainer, {});
                }}),
                w(Outlet, {id: 'dimLogs', renderer: (matchDetails: any) => {
                    return w(DimLogsContainer, {});
                }}),
                w(Outlet, {id: 'dimLogTail', renderer: (matchDetails: any) => {
                    return w(DimLogTailContainer, {});
                }}),
                w(Outlet, {id: 'dimRoutes', renderer: (matchDetails: any) => {
                    return w(DimRoutesContainer, {});
                }}),
            ])
        ]);
	}
}
