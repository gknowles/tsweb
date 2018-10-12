// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// dimCountersProcesses.ts - tismet
//
// Process dimapp performance counters

import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { baseUrl } from '../config';

// performance counters
const getDimCountersCommand = commandFactory(async ({ path }) => {
    const response = await fetch(`${baseUrl}/srv/counters.json`, {
        //mode: 'no-cors',
    });
    let out = {data: new Date(), info: await response.json()};
    return [replace(path('dimCounters'), out)];
});
export const getDimCountersProcess = createProcess('get-dimCounters', [
    getDimCountersCommand
]);
