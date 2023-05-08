import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryByName } from "../redux/actions";

const SearchBar = () => {

    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    const [nameCountry, setNameCountry] = useState('')

    const handleChange = (event) => {
        setNameCountry(event.target.value)
    }

    return (
        <div>
            <input type="search" onChange={handleChange} />
            <button on onClick={() => { dispatch(getCountryByName(nameCountry)) }}> Buscar </button>
        </div>)
}
export default SearchBar;