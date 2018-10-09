// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// App.ts - tismet

import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { Link } from '@dojo/framework/routing/Link';
import Toolbar from '@dojo/widgets/toolbar';

import * as css from '../styles/app.m.css';
import * as tbcss from '../styles/toolbar.m.css';
let theme = { '@dojo/widgets/toolbar': tbcss };
import { SettingsOutlet } from '../outlets';

export default class App extends WidgetBase {
	protected render() {
		return v('div', { classes: css.app }, [
            w(Toolbar, {
                theme,
                heading: 'Tismet',
                collapseWidth: 720,
            }, [
                w(Link, {to: 'tsAbout', classes: tbcss.tab}, ['Settings']),
                w(Link, {to: 'graph', classes: tbcss.tab}, ['Graph']),
                v('a', {href: 'https://github.com/gknowles/tismet/issues', 
                    classes: tbcss.tab}, 
                    ['Feedback']
                ),
            ]),
            v('div', { classes: css.main }, [
                w(SettingsOutlet, {}),
            ])
		]);
	}
}
