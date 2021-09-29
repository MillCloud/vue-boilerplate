import type { Store, StoreOptions } from 'vuex';
import 'vue2-helpers';
import 'vue2-helpers/vuex';

declare module 'vue2-helpers' {}

declare module 'vue2-helpers/vuex' {
  export declare function createStore<S = RootState>(options: StoreOptions<S>): Store<S>;
  export declare function useStore<S = RootState>(): Store<S>;
}

export {};
