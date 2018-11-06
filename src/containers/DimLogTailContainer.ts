// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// DimLogTailContainer.ts - tismet

import { Store } from '@dojo/framework/stores/Store';

import { DimLogTail } from '../widgets/DimLogTail';
import { getDimLogTailProcess } from '../processes/dimLogsProcesses';
import { State, TsInfo } from '../interfaces';
import StoreContainer from './StoreContainer';

function getProperties(store: Store<State>): TsInfo {
    let ci = store.get(store.path('dimLogTail')) || {info: {}, date: new Date};
    let out = {
        info: ci.info,
        date: ci.date,
        getInfo: getDimLogTailProcess(store),
    }
    return out;
}

export default StoreContainer(DimLogTail, 'state', {
    paths: [['dimLogTail']],
    getProperties
});
