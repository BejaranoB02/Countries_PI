export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_BY_ID = "GET COUNTRY BY ID"
export const CLEAR_COUNTRY_DETAIL = "CLEAR COUNTRY DETAIL"
export const GET_COUNTRY_BY_NAME = "GET COUNTRY BY NAME" 

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

export const clearCountryDetail = () => {
    return {
        type: CLEAR_COUNTRY_DETAIL,
    };
}

export const getCountryByName = (nameCountry) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/countries?name=${nameCountry}`)
            .then((data) => data.json())
            .then((data) => dispatch({type: GET_COUNTRY_BY_NAME, payload: data}))
    }
}