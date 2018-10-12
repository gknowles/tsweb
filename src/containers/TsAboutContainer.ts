// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// TsAboutContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { TsAbout } from '../widgets/TsAbout';
import { getTsAboutProcess } from '../processes/tsAboutProcesses';
import { State, TsInfo } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): TsInfo {
    let ci = store.get(store.path('tsAbout')) || {info: [], date: new Date};
    let out = {
        info: ci.info,
        date: ci.date,
        getInfo: getTsAboutProcess(store),
    }
    return out;
}

export default StoreContainer(TsAbout, 'state', {
    paths: [['tsAbout']],
    getProperties
});
