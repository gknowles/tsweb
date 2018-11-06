// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// dimCrashesProcesses.ts - tismet
//
// Process dimapp crash dumps

import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { baseUrl } from '../config';

// Log files
const getDimCrashesCommand = commandFactory(async ({ path }) => {
    const response = await fetch(`${baseUrl}/srv/crashes.json`, {
        //mode: 'no-cors',
    });
    let out = {data: new Date(), info: await response.json()};
    return [replace(path('dimCrashes'), out)];
});
export const getDimCrashesProcess = createProcess('get-dimCrashes', [
    getDimCrashesCommand
]);
