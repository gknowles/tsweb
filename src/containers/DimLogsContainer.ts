// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimLogsContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { DimLogs } from '../widgets/DimLogs';
import { getDimLogsProcess } from '../processes/dimLogsProcesses';
import { State, TsInfo } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): TsInfo {
    let ci = store.get(store.path('dimLogs')) || {info: {}, date: new Date};
    let out = {
        info: ci.info,
        date: ci.date,
        getInfo: getDimLogsProcess(store),
    }
    return out;
}

export default StoreContainer(DimLogs, 'state', {
    paths: [['dimLogs']],
    getProperties
});
