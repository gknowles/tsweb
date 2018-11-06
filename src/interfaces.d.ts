// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// interfaces.d.ts - tismet

export interface Errors {
	[index: string]: string[];
}

export interface Routing {
	outlet: string;
	params: { [index: string]: string };
}

export interface TsInfo {
    date: Date;
    info: any;
    getInfo: (opts: object) => void;
}

export interface State {
    routing: Routing;
    errors: Errors;
    dimCounters: any;
    dimCrashes: any;
    dimLogs: any;
    dimLogTail: any;
    dimRoutes: any;
    tsAbout: any;
    tsFuncts: any;
}
