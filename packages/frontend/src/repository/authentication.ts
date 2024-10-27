import { Request } from 'src/libraries/api';
import { appStore, store } from 'src/store';

export const login = (payload: { email: string; password: string }) =>
    Request(
        {
            method: 'post',
            url: `v1/user/login`,
        },
        payload
    ).then(async (res) => {
        if (!res.error) {
            await store.commit('setToken', res.data.token);
            await store.commit('getProfile', () => {});
        } else {
            appStore.commit('setToast', {
                type: 'error',
                message: res.message,
            });
        }
        return res;
    });

export const register = (payload: {
    name: string;
    email: string;
    password: string;
}) =>
    Request(
        {
            method: 'post',
            url: `v1/user/create`,
        },
        payload
    ).then(async (res) => {
        appStore.commit('setToast', {
            type: res.error ? 'error' : 'success',
            message: res.message,
        });
        return res;
    });

export const requestResetPassword = (payload: { email: string }) =>
    Request(
        {
            method: 'post',
            url: `v1/user/request-reset-password`,
        },
        payload
    ).then(async (res) => {
        appStore.commit('setToast', {
            type: res.error ? 'error' : 'success',
            message: res.message,
        });
        return res;
    });

export const changePassword = (payload: { password: string }) =>
    Request(
        {
            method: 'post',
            url: `v1/user/change-password`,
        },
        payload
    ).then(async (res) => {
        appStore.commit('setToast', {
            type: res.error ? 'error' : 'success',
            message: res.message,
        });
        return res;
    });
