import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import styles from "./navBar.module.css"
import backIcon from "../../icons/back-icon2.png"

const NavBar = (props) => {
    let link = ""
    if (props.pathname) link = props.pathname
    return (
        <div className={styles.navContainer}>


            {link.includes("home") ?
                <Link to="/">
                    <button className={styles.buttonBack}><img className={styles.buttonBackImg} src={backIcon} alt="" /></button>
                </Link>
                : <Link to={"/home"}>
                    <button className={styles.buttonBack}><img className={styles.buttonBackImg} src={backIcon} alt="" /></button>
                </Link>}

            {link.includes("home") ? <SearchBar /> : ""}

            {link.includes("home") ? <Filters /> : ""}

            {link.includes("detail") ? <p className={styles.textDetail}>Detalle del País</p> : ""}

            {link.includes("form") ? <p className={styles.textDetail}>Crea una actividad turística</p> : ""}

            <Link to="/form">
                {link.includes("home") ? <button className={styles.buttonForm}>Crear actividad</button> : <div> </div>}
            </Link>
        </div>
    );
};

export default NavBar;