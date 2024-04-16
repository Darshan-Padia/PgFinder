import { atom } from "recoil";

export const roleState = atom({
    key: 'roleState', // unique ID (with respect to other atoms/selectors)
    default: 'tenant', // default value (aka initial value)
  });