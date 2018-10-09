// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// tsFunctsProcesses.ts - tismet
//
// Functions allowed in expressions

import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { baseUrl } from '../config';

const getFunctsCommand = commandFactory(async ({ path }) => {
    const response = await fetch(`${baseUrl}/functions/index.json`, {
        //mode: 'no-cors',
    });
    let json = await response.json();
    let out = {date: new Date(), functs: json};
    return [replace(path('tsFuncts'), out)];
});
export const getTsFunctsProcess = createProcess('get-ts-functs', [
    getFunctsCommand
]);
