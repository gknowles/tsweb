// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// StoreContainer.ts - tismet

import { createStoreContainer } from '@dojo/framework/stores/StoreInjector';
import { State } from '../interfaces';

export default createStoreContainer<State>();
