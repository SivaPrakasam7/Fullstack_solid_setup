import Vuex from 'vuex';

//
import { getUserDetail } from 'src/repository/authentication';

//
import type { IAppStoreProps, IStoreProps, IToast } from './index.types';

//
export const mutations: Vuex.MutationTree<IStoreProps> = {
    getProfile: async (state, callback?: () => void) => {
        state.user = await getUserDetail();
        callback?.();
    },
    setToken: async (state, token: string | null) => {
        state.token = token;
        if (!token) state.user = null;
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
