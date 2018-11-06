// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// config.ts - tismet

import { RouteConfig } from '@dojo/framework/routing/interfaces';
import { Store } from '@dojo/framework/stores/Store'
import { State } from './interfaces';

import { getDimCountersProcess } from './processes/dimCountersProcesses';
import { getDimCrashesProcess } from './processes/dimCrashesProcesses';
import { getDimLogsProcess, getDimLogTailProcess 
    } from './processes/dimLogsProcesses';
import { getDimRoutesProcess } from './processes/dimRoutesProcesses';
import { getTsAboutProcess } from './processes/tsAboutProcesses';
import { getTsFunctsProcess } from './processes/tsFunctsProcesses';

export const baseUrl = 'https://localhost:41000';

export function getRouteConfig(store: Store<State>) {
    const config: RouteConfig[] = [
        {   path: 'settings', outlet: 'settings',
            children: [
                {   path: 'about', outlet: 'tsAbout',
                    onEnter: () => { getTsAboutProcess(store)({}); },
                },
                {   path: 'counters', outlet: 'dimCounters',
                    onEnter: () => { getDimCountersProcess(store)({}); },
                },
                {   path: 'crashes', outlet: 'dimCrashes',
                    onEnter: () => { getDimCrashesProcess(store)({}); },
                },
                {   path: 'functs', outlet: 'tsFuncts',
                    onEnter: () => { getTsFunctsProcess(store)({}); },
                },
                {   path: 'logs', outlet: 'dimLogs',
                    onEnter: () => { getDimLogsProcess(store)({}); },
                },
                {   path: 'logtail/{file}', outlet: 'dimLogTail',
                    onEnter: (outlet) => { 
                        getDimLogTailProcess(store)({file: outlet.file}); 
                    },
                },
                {   path: 'routes', outlet: 'dimRoutes',
                    onEnter: () => { getDimRoutesProcess(store)({}); },
                },
            ]
        },
        {   path: 'graph', outlet: 'graph', 
        },
    ];
    return config;
}
