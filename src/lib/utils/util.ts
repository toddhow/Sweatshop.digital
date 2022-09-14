import { LocalStorageKeys } from './constants';
import isBrowser from './isBrowser';
import axios from 'axios';

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const loadState = <T>(key: LocalStorageKeys): T | null => {
    if (isBrowser) {
        const serializedState = localStorage.getItem(key);
        return serializedState ? (JSON.parse(serializedState) as T) : null;
    }

    return null;
};

export const saveState = <T>(key: LocalStorageKeys, state: T): T => {
    try {
        if (isBrowser) {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(key, serializedState);
        }
    } catch {
        // intentionally empty
    }

    return state;
};

export const clearState = (key: LocalStorageKeys) => {
    if (isBrowser) {
        localStorage.removeItem(key);
    }
};

export const request = axios.create({
    baseURL: 'http://localhost:4000/v1/',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
    },
});

export const fetchUser = async (userId: string) => {
    await request.get(`/users/${userId}`);
};
