import { SETDATA } from '../Actions/types';

// This is only slice of whole app state, related to this reducer.....
const INITIAL_STATE = {
    countryName: ""
};

const CountryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETDATA:
            // this will reset volume muted props to true/false
            return { ...state, countryName: action.countryName };
        default:
            /*
            We will just return the state. Return the initial state when nothing changes
            hence no re-rendering.
            */
            return state;
    }
};
export default CountryReducer;