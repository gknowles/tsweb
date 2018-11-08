// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimCrashesContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { DimCrashes } from '../widgets/DimCrashes';
import { getDimCrashesProcess } from '../processes/dimCrashesProcesses';
import { State, TsInfo } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): TsInfo {
    let ci = store.get(store.path('dimCrashes')) || {info: {}, date: new Date};
    let out = {
        info: ci.info,
        date: ci.date,
        getInfo: getDimCrashesProcess(store),
    }
    return out;
}

export default StoreContainer(DimCrashes, 'state', {
    paths: [['dimCrashes']],
    getProperties
});
