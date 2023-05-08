import CountryDetail from "../../views/CountryDetail/CountryDetail";
import styles from "./card.module.css"
import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <div className={styles.cardContainer}>
            <Link to={`/detail/${props.id}`}>
                <img src={props.image} alt='' className={styles.flagImage} />
            </Link>
            <Link to={`/detail/${props.id}`}>
                <h2>{props.name}</h2>
            </Link>
            <h2>{props.continent}</h2>
        </div>
    )
}

export default Card;