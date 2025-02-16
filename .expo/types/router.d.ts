/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(modal)/dish` | `/(modal)/filter` | `/(modal)/location-search` | `/_sitemap` | `/basket` | `/details` | `/dish` | `/filter` | `/location-search` | `/theme`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
