import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllCountries } from "../../redux/actions"
import NavBar from "../../components/NavBar/NavBar";
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./home.module.css"

const Home = () => {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    const numPage = useSelector((state) => state.numPage)
    let location = useLocation();

    let from = (numPage - 1) * 10;
    let until = numPage * 10;
    let cantPages = Math.floor(countries.length) / 10;
    let viewCounries = countries.slice(from, until)

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
                <Cards countries={viewCounries} />
            </div>
            <Pagination cantPages={cantPages}/>
        </div>
    )
}

export default Home;
