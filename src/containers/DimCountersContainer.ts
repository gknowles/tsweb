// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimCountersContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { DimCounters } from '../widgets/DimCounters';
import { getDimCountersProcess } from '../processes/dimCountersProcesses';
import { State, TsInfo } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): TsInfo {
    let ci = store.get(store.path('dimCounters')) || {info: {}, date: new Date};
    let out = {
        info: ci.info,
        date: ci.date,
        getInfo: getDimCountersProcess(store),
    }
    return out;
}

export default StoreContainer(DimCounters, 'state', {
    paths: [['dimCounters']],
    getProperties
});
