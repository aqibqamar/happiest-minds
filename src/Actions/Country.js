import * as types from './types';

/* show Users fetched from server for later use....*/
export const setData = (name) => {
    return {
        type: types.SETDATA,
        countryName: name
    }
}