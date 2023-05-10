import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryByName } from "../../redux/actions";
import styles from "./searchBar.module.css"
import iconSearch from "../../icons/search-icon.svg"

const SearchBar = () => {

    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    const [nameCountry, setNameCountry] = useState('')

    const handleChange = (event) => {
        setNameCountry(event.target.value)
    }

    return (
        <div className={styles.searchBarContainer}>
            <input className={styles.searchInput} type="search" onChange={handleChange} />
            <button className={styles.searchButton}on onClick={() => { dispatch(getCountryByName(nameCountry)) }}><img src={iconSearch} className={styles.buttonImg}/></button>
        </div>)
}
export default SearchBar;