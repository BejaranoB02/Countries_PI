export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_BY_ID = "GET COUNTRY BY ID"
export const CLEAR_COUNTRY_DETAIL = "CLEAR COUNTRY DETAIL"
export const GET_COUNTRY_BY_NAME = "GET COUNTRY BY NAME"
export const GET_COUNTRIES_BY_CONTINENT = "GET COUNTRIES BY CONTINENT"
export const ORDER_COUNTRIES = "ORDER COUNTRIES"
export const GET_ACTIVITIES = "GET ACTIVITIES"
export const GET_COUNTRY_BY_ACTIVITY = "GET_COUNTRY_BY_ACTIVITY"
export const PREV_PAGE = "PREV PAGE"
export const NEXT_PAGE = "NEXT PAGE"

export const getAllCountries = () => {
    return (dispatch) => {
        fetch("http://localhost:3001/countries")
            .then((data) => data.json())
            .then((data) => dispatch({ type: GET_ALL_COUNTRIES, payload: data }))
    };
};

export const getCountryById = (idCountry) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/countries/${idCountry}`)
            .then((data) => data.json())
            .then((data) => dispatch({ type: GET_COUNTRY_BY_ID, payload: data }))
    }
}

export const getCountryByName = (nameCountry) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/countries?name=${nameCountry}`)
            .then((data) => data.json())
            .then((data) => dispatch({ type: GET_COUNTRY_BY_NAME, payload: data }))
    }
}

export const getCountriesByContinent = (continent) => {
    return { type: GET_COUNTRIES_BY_CONTINENT, payload: continent }
}

export const orderCountries = (order) => {
    return { type: ORDER_COUNTRIES, payload: order }
}

export const getCountriesByActivity = (countries) => {
    return { type: GET_COUNTRY_BY_ACTIVITY, payload: countries }
}

export const nextPage = () => {
    return { type: NEXT_PAGE }
}

export const prevPage = () => {
    return { type: PREV_PAGE }
}