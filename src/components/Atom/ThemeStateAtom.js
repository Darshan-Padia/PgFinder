import { atom } from "recoil";

export const isDarkState = atom({
    key: 'isDarkState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });