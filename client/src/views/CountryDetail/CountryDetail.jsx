import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearCountryDetail, getCountryById } from "../../redux/actions";

const CountryDetail = (props) => {

    const { idCountry } = useParams();
    const dispatch = useDispatch()
    const country = useSelector((state) => state.countryDetail)

    useEffect(()=>{
        dispatch(getCountryById(idCountry))
        // return dispatch(clearCountryDetail())
    },[idCountry]
    )
    return (
        
        <div>
            <h2>{country.id}</h2>
            <h1>{country.name}</h1>
            <img src={country.flagImage} />
            <h2>{country.continent}</h2>
            <h2>{country.capital}</h2>
            <h2>{country.subregion}</h2>
            <h2>{country.population}</h2>
        </div>
    )
}

export default CountryDetail;