// Copyright Glen Knowles 2018.
// Distributed under the Boost Software License, Version 1.0.
//
// outlets.ts - tismet

import { Outlet } from '@dojo/framework/routing/Outlet'

export const SettingsOutlet = Outlet('settings', 'settings');
export const AboutOutlet = Outlet('tsAbout', 'tsAbout');
export const FunctsOutlet = Outlet('tsFuncts', 'tsFuncts');
export const CountersOutlet = Outlet('dimCounters', 'dimCounters');
export const CrashesOutlet = Outlet('dimCrashes', 'dimCrashes');
export const LogsOutlet = Outlet('dimLogs', 'dimLogs');
export const LogTailOutlet = Outlet('dimLogTail', 'dimLogTail');
export const RoutesOutlet = Outlet('dimRoutes', 'dimRoutes');
