import { CLEAR_COUNTRY_DETAIL, GET_ALL_COUNTRIES, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, GET_COUNTRIES_BY_CONTINENT, ORDER_COUNTRIES, GET_COUNTRY_BY_ACTIVITY, nextPage, NEXT_PAGE, PREV_PAGE } from "./actions";

const initialState = {
    copyactivities: [],
    copyCountries: [],
    countries: [],
    numPage: 1,
    countryDetail: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return { ...state, countries: action.payload, copyCountries: action.payload };
        case GET_COUNTRY_BY_ACTIVITY:
            const filterName = (countryName) => {
                console.log(action.payload)
                let value = false
                action.payload[0].forEach((country) => {
                    if (country.name === countryName) {
                        value = true
                    }
                })
                return value
            }
            console.log(filterName(state.copyCountries[1].name))
            return { ...state, countries: [...state.copyCountries.filter((country) => filterName(country.name) === true)] }
        case GET_COUNTRY_BY_ID:
            return { ...state, countryDetail: action.payload }
        case CLEAR_COUNTRY_DETAIL:
            return { ...state, countryDetail: {} }
        case GET_COUNTRY_BY_NAME:
            return { ...state, countries: action.payload }
        case GET_COUNTRIES_BY_CONTINENT:
            return { ...state, countries: [...state.copyCountries.filter((country) => country.continent === action.payload)] }
        case ORDER_COUNTRIES:
            if (action.payload === "Alfabeticamente ascendente") {
                return {
                    ...state, countries: [...state.countries.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1
                        }
                        if (a.name > b.name) {
                            return 1
                        }
                        return 0
                    })
                    ]
                }
            }
            if (action.payload === "Alfabeticamente descendente") {
                return {
                    ...state, countries: [...state.countries.sort((a, b) => {
                        if (a.name < b.name) {
                            return 1
                        }
                        if (a.name > b.name) {
                            return -1
                        }
                        return 0
                    })
                    ]
                }
            }
            if (action.payload === "Por poblacion ascendente") {
                return { ...state, countries: [...state.countries.sort((a, b) => a.population - b.population)] }
            }
            if (action.payload === "Por poblacion descendente") {
                return { ...state, countries: [...state.countries.sort((a, b) => b.population - a.population)] }
            }

        case NEXT_PAGE:
            return { ...state, numPage: state.numPage + 1 }

        case PREV_PAGE:
            return { ...state, numPage: state.numPage - 1 }
        default:
            return { ...state }
    };
};

export default rootReducer;