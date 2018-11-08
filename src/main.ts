// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// main.ts - tismet

import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import { Registry } from '@dojo/framework/widget-core/Registry';
import { Store } from '@dojo/framework/stores/Store';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import App from './widgets/App';
import { changeRouteProcess } from './processes/routeProcesses';
import { State } from './interfaces';
import { getRouteConfig } from './config';

const store = new Store<State>();
const registry = new Registry();
const router = registerRouterInjector(getRouteConfig(store), registry);

import { getDimCountersProcess } from './processes/dimCountersProcesses';
import { getDimCrashesProcess } from './processes/dimCrashesProcesses';
import { getDimLogsProcess, getDimLogTailProcess 
    } from './processes/dimLogsProcesses';
import { getDimRoutesProcess } from './processes/dimRoutesProcesses';
import { getTsAboutProcess } from './processes/tsAboutProcesses';
import { getTsFunctsProcess } from './processes/tsFunctsProcesses';

router.on('outlet', ({outlet, action}: any) => {
    if (action !== 'enter')
        return;
    switch (outlet.id) {
        case 'dimCounters': getDimCountersProcess(store)({}); break;
        case 'dimCrashes': getDimCrashesProcess(store)({}); break;
        case 'dimLogs': getDimLogsProcess(store)({}); break;
        case 'dimLogTail': 
            getDimLogTailProcess(store)({file: outlet.params.file});
            break;
        case 'dimRoutes': getDimRoutesProcess(store)({}); break;
        case 'tsAbout': getTsAboutProcess(store)({}); break;
        case 'tsFuncts': getTsFunctsProcess(store)({}); break;
    }
});

router.on('nav', ({outlet, context}: any) => {
    changeRouteProcess(store)({outlet, context});
});

function onRouteChange() {
	const outlet = store.get(store.path('routing', 'outlet'));
	const params = store.get(store.path('routing', 'params'));
	if (outlet) {
		const link = router.link(outlet, params);
		if (link !== undefined) {
			router.setPath(link);
		}
	}
}
store.onChange(store.path('routing', 'outlet'), onRouteChange);
store.onChange(store.path('routing', 'params'), onRouteChange);

registry.defineInjector('state', () => () => store);

// Create a projector to convert the virtual DOM produced by the application 
// into the rendered page.
const r = renderer(() => w(App, {}));
r.mount({domNode: document.getElementById('app')!, registry});
