import { CLEAR_COUNTRY_DETAIL, GET_ALL_COUNTRIES, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME } from "./actions";

const initialState = {
    countries: [],
    countryDetail: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return { ...state, countries: action.payload };
        case GET_COUNTRY_BY_ID:
            return { ...state, countryDetail: action.payload }
        case CLEAR_COUNTRY_DETAIL:
            return { ...state, countryDetail: {} }
        case GET_COUNTRY_BY_NAME:
            return { ...state, countries: action.payload }
        default:
            return { ...state }
    };
};

export default rootReducer;