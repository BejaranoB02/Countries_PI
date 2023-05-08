import Card from "../Card/Card"
import styles from "./cards.module.css"

const Cards = (props) => {
    const {countries} = props
    return (
        <div className={styles.cardsContainer}>
            {countries.map((country) => {
                return <Card key={country.id}
                id={country.id}
                image={country.flagImage}
                name={country.name}
                continent={country.continent}
                />
            })}    
        </div>
    )
}

export default Cards;