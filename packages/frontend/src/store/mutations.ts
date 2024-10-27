import Vuex from 'vuex';

//
import type { IAppStoreProps, IStoreProps, IToast } from './index.types';

//
export const mutations: Vuex.MutationTree<IStoreProps> = {
    getProfile: async (state, callback?: () => void) => {
        state.token = '';
        callback?.();
    },
    setToken: async (state, token: string) => {
        state.token = token;
    },
};

export const appMutations: Vuex.MutationTree<IAppStoreProps> = {
    setToast: (state, data: IToast) => {
        if (state.toasts.length === 3) {
            state.toasts = state.toasts.slice(1);
        }
        state.toasts.push({ ...data, duration: 5000, timestamp: Date.now() });
    },
};
