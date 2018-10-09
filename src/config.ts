// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// config.ts - tismet

import { RouteConfig } from '@dojo/framework/routing/interfaces';
import { Store } from '@dojo/framework/stores/Store'
import { State } from './interfaces';

import { getDimCountersProcess } from './processes/dimCountersProcesses';
import { getDimRoutesProcess } from './processes/dimRoutesProcesses';
import { getTsAboutProcess } from './processes/tsAboutProcesses';
import { getTsFunctsProcess } from './processes/tsFunctsProcesses';

export const baseUrl = 'https://localhost:41000';

export function getRouteConfig(store: Store<State>) {
    const config: RouteConfig[] = [
        {
            path: 'settings',
            outlet: 'settings',
            children: [
                {
                    path: 'about',
                    outlet: 'tsAbout',
                    onEnter: () => {
                        getTsAboutProcess(store)({});
                    },
                },
                {
                    path: 'functs',
                    outlet: 'tsFuncts',
                    onEnter: () => {
                        getTsFunctsProcess(store)({});
                    },
                },
                {
                    path: 'counters',
                    outlet: 'dimCounters',
                    onEnter: () => {
                        getDimCountersProcess(store)({});
                    },
                },
                {
                    path: 'routes',
                    outlet: 'dimRoutes',
                    onEnter: () => {
                        getDimRoutesProcess(store)({});
                    },
                },
            ]
        },
        {
            path: 'graph',
            outlet: 'graph',
        },
    ];
    return config;
}
