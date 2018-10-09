// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// routeProcesses.ts - tismet

import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { ChangeRoutePayload } from './interfaces';

const changeRouteCommand = commandFactory<ChangeRoutePayload>(({
    path,
    payload: { outlet, context }
}) => {
    return [
        replace(path('routing', 'outlet'), outlet),
        replace(path('routing', 'params'), context.params),
        replace(path('errors'), {})
    ];
});

export const changeRouteProcess = createProcess('change-route', [
    changeRouteCommand
]);
