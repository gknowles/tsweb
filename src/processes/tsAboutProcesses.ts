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
import { InfoTable } from '../interfaces';

const getAboutCommand = commandFactory(async ({ path }) => {
    const response = await fetch(`${baseUrl}/srv/about.json`, {
        //mode: 'no-cors',
    });
    let json = await response.json();
    let out = {} as InfoTable;
    out.date = new Date();
    out.lists = [{
            title: 'Execution',
            items: [
                {name: 'Product Version', value: json.version},
                {name: 'Start Time', value: json.startTime},
                {name: 'Root directory', value: json.rootDir},
                {name: 'System account',
                    value: json.account[0].name + '@' + json.account[0].domain},
                {name: 'Running as a service', value: json.service.toString()},
            ]
        },
        {
            title: 'Data',
            items: [
                {name: 'Data directory', value: json.dataPath},
                {name: 'Log directory', value: json.logPath},
                {name: 'Crash directory', value: json.crashPath},
            ]
        },
    ];
    return [replace(path('tsAbout'), out)];
});
export const getTsAboutProcess = createProcess('get-ts-about', [
    getAboutCommand
]);
