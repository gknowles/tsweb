// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// tsAboutProcesses.ts - tismet
//
// Basic information about the application

import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { commandFactory } from './utils';
import { baseUrl } from '../config';

const getAboutCommand = commandFactory(async ({ path }) => {
    const response = await fetch(`${baseUrl}/srv/about.json`, {
        //mode: 'no-cors',
    });
    let out = {data: new Date(), info: await response.json()};
    return [replace(path('tsAbout'), out)];
});
export const getTsAboutProcess = createProcess('get-tsAbout', [
    getAboutCommand
]);
