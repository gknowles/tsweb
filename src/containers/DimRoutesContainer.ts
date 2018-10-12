// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimRoutesContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { DimRoutes } from '../widgets/DimRoutes';
import { getDimRoutesProcess } from '../processes/dimRoutesProcesses';
import { State, TsInfo } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): TsInfo {
    let ci = store.get(store.path('dimRoutes')) || {info: [], date: new Date};
    let out = {
        info: ci.info,
        date: ci.date,
        getInfo: getDimRoutesProcess(store),
    }
    return out;
}

export default StoreContainer(DimRoutes, 'state', {
    paths: [['dimRoutes']],
    getProperties
});
