// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// dimRoutesProcesses.ts - tismet
//
// Process dimapp registered http routes

import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { baseUrl } from '../config';

// registered http routes
const getDimRoutesCommand = commandFactory(async ({ path }) => {
    const response = await fetch(`${baseUrl}/srv/routes.json`, {
        //mode: 'no-cors',
    });
    let out = {data: new Date(), info: await response.json()};
    return [replace(path('dimRoutes'), out)];
});
export const getDimRoutesProcess = createProcess('get-dimRoutes', [
    getDimRoutesCommand
]);
