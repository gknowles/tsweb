// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// processes/utils.ts - tismet

import { createCommandFactory } from '@dojo/framework/stores/process';
import { State } from '../interfaces';

export function getHeaders(token?: string): any {
	const headers: { [key: string]: string } = {
		'Content-Type': 'application/json'
	};
	if (token) {
		headers['Authorization'] = `Token ${token}`;
	}
	return headers;
}

export const commandFactory = createCommandFactory<State>();
