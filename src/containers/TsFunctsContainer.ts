// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// TsFunctsContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { TsFuncts, TsFunctsProperties } from '../widgets/TsFuncts';
import { getTsFunctsProcess } from '../processes/tsFunctsProcesses';
import { State } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): TsFunctsProperties {
    let ci = store.get(store.path('tsFuncts')) || {info: [], date: new Date};
    let out = {
        info: ci.info,
        date: ci.date,
        getInfo: getTsFunctsProcess(store),
    }
    return out;
}

export default StoreContainer(TsFuncts, 'state', {
    paths: [['tsFuncts']],
    getProperties
});
