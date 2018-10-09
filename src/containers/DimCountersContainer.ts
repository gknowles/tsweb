// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimCountersContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { DimCounters, DimCountersProperties } from '../widgets/DimCounters';
import { getDimCountersProcess } from '../processes/dimCountersProcesses';
import { State } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): DimCountersProperties {
    let ci = store.get(store.path('dimCounters')) || {items: [], date: new Date};
    let out = {
        items: ci.items,
        date: ci.date,
        getCounters: getDimCountersProcess(store),
    }
    return out;
}

export default StoreContainer(DimCounters, 'state', {
    paths: [['dimCounters']],
    getProperties
});
