// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// config.ts - tismet

import { RouteConfig } from '@dojo/framework/routing/interfaces';
import { Store } from '@dojo/framework/stores/Store'
import { State } from './interfaces';

export const baseUrl = ''; // 'https://localhost:41000';

export function getRouteConfig(store: Store<State>) {
    const config: RouteConfig[] = [
        { path: 'settings', outlet: 'settings',
            children: [
                { path: 'about', outlet: 'tsAbout' },
                { path: 'counters', outlet: 'dimCounters' },
                { path: 'crashes', outlet: 'dimCrashes' },
                { path: 'functs', outlet: 'tsFuncts' },
                { path: 'logs', outlet: 'dimLogs' },
                { path: 'logtail/{file}', outlet: 'dimLogTail' },
                { path: 'routes', outlet: 'dimRoutes' },
            ]
        },
        { path: 'graph', outlet: 'graph' },
    ];
    return config;
}
