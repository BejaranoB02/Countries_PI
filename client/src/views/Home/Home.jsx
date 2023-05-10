import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cards from "../../components/Cards/Cards";
import styles from "./home.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getAllCountries } from "../../redux/actions"
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    let location = useLocation();

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    const pathname = location.pathname
    return (
        <div className={styles.homeContainer}>
            <div className={styles.searchBarContainer}>
                <NavBar classname={styles.navBar} pathname={pathname} />
            </div>
            <div className={styles.cardsContainer}>
                <Cards countries={countries} />
            </div>
        </div>
    )
}

export default Home;
