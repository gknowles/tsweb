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

export interface DimCounterItem {
    name: string;
    value: number;
}
export interface DimCountersItem {
    items: CounterItem[];
    date: Date;
}

export interface DimRouteItem {
    path: string;
    methods: string[];
    matched: number;
}
export interface DimRoutesItem {
    items: DimRouteItem[];
    date: Date;
}

export interface InfoItem {
    name: any; 
    value: any;
}
export interface InfoList {
    title: string;
    items: InfoItem[];
}
export interface InfoTable {
    lists: InfoList[];
    date: Date;
}

export interface State {
    routing: Routing;
    errors: Errors;
    dimCounters: DimCountersItem;
    dimRoutes: DimRoutesItem;
    tsAbout: InfoTable;
    tsFuncts: any;
}
