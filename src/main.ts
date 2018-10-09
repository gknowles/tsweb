// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// main.ts - tismet

import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';
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

registry.define('settings', () => import('./widgets/Settings'))
registry.define('dimCounters', () => import('./containers/DimCountersContainer'));
registry.define('dimRoutes', () => import('./containers/DimRoutesContainer'));
registry.define('tsAbout', () => import('./containers/TsAboutContainer'));
registry.define('tsFuncts', () => import('./containers/TsFunctsContainer'));

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
const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry })

// By default, append() will attach the rendered content to document.body. To 
// insert this application into existing HTML content, pass the desired root 
// node to append().
const root = document.querySelector('app') || undefined;
projector.append(root);
