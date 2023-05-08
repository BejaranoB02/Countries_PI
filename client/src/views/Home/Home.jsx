import { useEffect} from "react";
import Cards from "../../components/Cards/Cards";
import SearchBar from "../../components/SearchBar"
import styles from "./home.module.css"
import {useDispatch, useSelector} from "react-redux"
import {getAllCountries} from "../../redux/actions"

const Home = () => {
    const countries = useSelector((state) => state.countries)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCountries())
    },[])
console.log(countries)
return (
    <div className={styles.homeContainer}>
        <div className={styles.searchBarContainer}>
        <SearchBar/>
        </div>
        <div className={styles.cardsContainer}>
        <Cards countries={countries} />
        </div>
    </div>
)
}

export default Home;
