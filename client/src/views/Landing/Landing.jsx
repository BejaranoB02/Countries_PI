import { Link } from "react-router-dom"
import styles from "./landing.module.css"

const Landing = () => {
    return (
        <div className={styles.containerLanding}>
            <Link to="/home">
                <button className={styles.buttonLanding}> Home </button>
            </Link>
            <Link to="/form">
            <button className={styles.buttonLanding}> Form </button>
            </Link>
        </div>
    )
}

export default Landing;