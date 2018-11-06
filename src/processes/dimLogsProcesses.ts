// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// dimLogsProcesses.ts - tismet
//
// Process dimapp log files

import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { baseUrl } from '../config';

// Log files
const getDimLogsCommand = commandFactory(async ({ path }) => {
    const response = await fetch(`${baseUrl}/srv/logfiles.json`, {
        //mode: 'no-cors',
    });
    let out = {data: new Date(), info: await response.json()};
    return [replace(path('dimLogs'), out)];
});
export const getDimLogsProcess = createProcess('get-dimLogs', [
    getDimLogsCommand
]);

// Log file tail
const getDimLogTailCommand = commandFactory(async ({ path, payload }) => {
    const response = await fetch(`${baseUrl}/srv/logtail/${payload.file}`, {
        //mode: 'no-cors',
    });
    let out = {data: new Date(), info: await response.json()};
    return [replace(path('dimLogTail'), out)];
});
export const getDimLogTailProcess = createProcess('get-dimLogTail', [
    getDimLogTailCommand
]);
