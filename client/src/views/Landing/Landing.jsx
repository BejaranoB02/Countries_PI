import { Link } from "react-router-dom"
import styles from "./landing.module.css"
import titleImg from "../../images/countries-title.png"

const Landing = () => {

    return (
        <div className={styles.containerLanding}>
            <img src={titleImg} alt="" />
            <p className={styles.welcomeText}>¡Bienvenidos al proyecto Countries! 
            Countries, es un proyecto que ofrece servicios, como buscar países  y
            acceder a su información, también podrás crear actividades turísticas
            para realizar en estos países.  </p>
            <Link to="/home">
                <button className={styles.buttonLanding} > Home </button>
            </Link>
        </div>
    )
}

export default Landing;