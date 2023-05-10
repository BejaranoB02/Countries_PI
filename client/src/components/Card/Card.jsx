import styles from "./card.module.css"
import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <Link className={styles.linkCard}to={`/detail/${props.id}`}>
        <div className={styles.cardContainer}>
            
                <img src={props.image} alt='' className={styles.flagImage} />
            
                <h2>{props.name}</h2>
            
            <h2>{props.continent}</h2>
        </div>
        </Link>
    )
}

export default Card;