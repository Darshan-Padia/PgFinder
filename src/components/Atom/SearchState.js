import { atom } from "recoil";

export const searchState = atom({
    key: 'searchState', // unique ID (with respect to other atoms/selectors)
    default: {
        'city': '',
        'numRooms' : 1,
        'minRent': 1,
        'maxRent': 1000000,
        'availableDate': "2000-01-01"
    }, // default value (aka initial value)
  });