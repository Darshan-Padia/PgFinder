import { atom } from "recoil";

export const propertyState = atom({
    key: 'propertyState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
  });