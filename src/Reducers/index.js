import { combineReducers } from "redux";
import CountryReducer from "./CountryReducer";

export default combineReducers({
    country_reducer: CountryReducer
});
