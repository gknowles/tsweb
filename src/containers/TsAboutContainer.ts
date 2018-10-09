// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// TsAboutContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { TsInfo, TsInfoProperties } from '../widgets/TsInfo';
import { getTsAboutProcess } from '../processes/tsAboutProcesses';
import { State } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): TsInfoProperties {
    let ci = store.get(store.path('tsAbout')) || {lists: [], date: new Date};
    let out = {
        lists: ci.lists,
        date: ci.date,
        getInfo: getTsAboutProcess(store),
    }
    return out;
}

export default StoreContainer(TsInfo, 'state', {
    paths: [['tsAbout']],
    getProperties
});
