import { atom } from "recoil";

export const authState = atom({
    key: 'authState',
    default: {
        email: '',
        role: '',
        accessToken: '',
        refreshToken: '',
        password: ''
    }
});
