import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryById } from "../../redux/actions";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./detail.module.css"
import capitalIcon from "../../icons/capital-icon.png"
import continentIcon from "../../icons/continent-icon.png"
import populationIcon from "../../icons/population-icon.png"
import subregionIcon from "../../icons/subregion-icon.png"
import idIcon from "../../icons/id-icon.png"

const Detail = () => {

    const { idCountry } = useParams();
    const dispatch = useDispatch()
    const country = useSelector((state) => state.countryDetail)

    useEffect(() => {
        dispatch(getCountryById(idCountry))
    }, [idCountry]
    )

    let location = useLocation();
    const pathname = location.pathname
    return (

        <div>
            <NavBar pathname={pathname} />
            <div className={styles.detailContainer}>
                <div className={styles.flagContainer}>
                    <img className={styles.flagImage} src={country.flagImage} />
                    <h1 className={styles.nameText}>{country.name}</h1>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.infoTextContainer}>
                        <img className={styles.infoIcon} src={idIcon} alt="" />
                        <h2 className={styles.infoText}>Id: </h2>
                        <h2 className={styles.infoText}>{country.id}</h2>
                    </div>
                    <div className={styles.infoTextContainer}>
                        <img className={styles.infoIcon} src={continentIcon} alt="" />
                        <h2 className={styles.infoText}>Continent: </h2>
                        <h2 className={styles.infoText}>{country.continent}</h2>
                    </div>
                    <div className={styles.infoTextContainer}>
                        <img className={styles.infoIcon} src={capitalIcon} alt="" />
                        <h2 className={styles.infoText}>Capital: </h2>
                        <h2 className={styles.infoText}>{country.capital}</h2>
                    </div>
                    <div className={styles.infoTextContainer}>
                        <img className={styles.infoIcon} src={subregionIcon} alt="" />
                        <h2 className={styles.infoText}>Subregion: </h2>
                        <h2 className={styles.infoText}>{country.subregion}</h2>
                    </div>
                    <div className={styles.infoTextContainer}>
                        <img className={styles.infoIcon} src={populationIcon} alt="" />
                        <h2 className={styles.infoText}>Population: </h2>
                        <h2 className={styles.infoText}>{country.population}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;