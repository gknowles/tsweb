// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimRoutesContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { DimRoutes, DimRoutesProperties } from '../widgets/DimRoutes';
import { getDimRoutesProcess } from '../processes/dimRoutesProcesses';
import { State } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): DimRoutesProperties {
    let ci = store.get(store.path('dimRoutes')) || {items: [], date: new Date};
    let out = {
        items: ci.items,
        date: ci.date,
        getRoutes: getDimRoutesProcess(store),
    }
    return out;
}

export default StoreContainer(DimRoutes, 'state', {
    paths: [['dimRoutes']],
    getProperties
});
