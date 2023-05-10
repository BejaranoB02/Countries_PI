import { Link } from "react-router-dom"
import styles from "./landing.module.css"
import titleImg from "../../images/countries-title.png"

const Landing = () => {

    return (
        <div className={styles.containerLanding}>
            <img src={titleImg} alt="" />
            <p className={styles.welcomeText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptates dolorem
                nostrum quis odit? Odio autem commodi fugit. Praesentium accusamus repudiandae
                veniam exercitationem non perferendis vero officia voluptatibus dolor ipsa.</p>
            <Link to="/home">
                <button className={styles.buttonLanding} > Home </button>
            </Link>
        </div>
    )
}

export default Landing;