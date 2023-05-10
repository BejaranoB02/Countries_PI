import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import validation from "./validation";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./form.module.css"
import addIcon from "../../icons/add-icon.png"

const Form = () => {

    const countries = useSelector((state) => state.countries)
    const dispatch = useDispatch()
    const [inputCountryValue, setInputCountryValue] = useState("")
    const [addCountries, setAddCountries] = useState([])
    const [errors, setErrors] = useState([])
    const [time, setTime] = useState({
        startTime: "00:00",
        finishTime: "00:00",
    })
    const [infoActivity, setInfoActivity] = useState({
        name: "",
        dificulty: "1",
        duration: "00:00",
        season: "spring",
        countries: [],
    })

    const fillInfoActivity = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInfoActivity({ ...infoActivity, [name]: value })
        setErrors(validation({ ...infoActivity, [name]: value }))

    }


    const handleChange = (event) => {
        setInputCountryValue(event.target.value)
    }

    const searchCountry = (nameCountry) => {
        let result = {};
        countries.forEach((country) => {
            if (nameCountry === country.name) {
                result = country;
            };
        });
        return result;
    };

    const handleButtonCountries = () => {
        if (inputCountryValue !== "") {
            const result = searchCountry(inputCountryValue)
            const id = result.id
            if (!addCountries.includes(result)) {
                setAddCountries([...addCountries, result]);
                setInputCountryValue("");
                setInfoActivity({ ...infoActivity, countries: [...infoActivity.countries, id] })
                setErrors(validation({ ...infoActivity, countries: [...infoActivity.countries, id] }))
            } else {
                setErrors({ ...errors, countries: `${result.name}, ya fue seleccionado` })
            }
        }
    }

    const deleteCountry = (countryName, id) => {
        setAddCountries(addCountries.filter((country) => country.name !== countryName))
        setInfoActivity({ ...infoActivity, countries: infoActivity.countries.filter((countryId) => countryId !== id) })
        setErrors(validation({ ...infoActivity, countries: infoActivity.countries.filter((countryId) => countryId !== id) }))
    }

    const calculateDuration = (event) => {
        let totalStartMinutes = 0
        let totalFinishMinutes = 24 * 60
        let startTime = time.startTime
        let finishTime = time.finishTime
        if (event.target.name === "startTime") {
            setTime({ ...time, startTime: event.target.value })
            startTime = event.target.value
        }
        if (event.target.name === "finishTime") {
            setTime({ ...time, finishTime: event.target.value })
            finishTime = event.target.value
        }
        totalStartMinutes = parseInt(startTime.substring(0, 2)) * 60 + parseInt(startTime.substring(3))
        totalFinishMinutes = parseInt(finishTime.substring(0, 2)) * 60 + parseInt(finishTime.substring(3))
        console.log(startTime)
        console.log(finishTime)

        let hours = Math.floor((totalFinishMinutes - totalStartMinutes) / 60)
        let minutes = (totalFinishMinutes - totalStartMinutes) - (hours * 60)

        if (minutes < 10) {
            minutes = "0" + minutes.toString()
        } else {
            minutes = minutes.toString()
        }

        let duration = hours.toString() + ":" + minutes

        setInfoActivity({ ...infoActivity, duration: duration })
        setErrors(validation({ ...infoActivity, duration: duration }))
    }

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    const postActivty = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/activities", infoActivity)
            .then(() => alert("La actividad fue creada con exito"))
            .catch((error) => console.log(error.message))
        setInfoActivity({
            name: "",
            dificulty: "1",
            duration: "00:00",
            season: "spring",
            countries: [],
        })
        setAddCountries([])
        setTime({
            finishTime: "00:00",
            startTime: "00:00",
        })
    }

    let location = useLocation();
    let pathname = location.pathname

    return (
        <div>
            <NavBar pathname={pathname} />
            <div className={styles.formBackground}>
                <form className={styles.formContainer} onSubmit={postActivty}>
                    <div>
                        <label className={styles.textForm}> Nombre de la actividad: </label>
                        <input className={styles.optionsForm} name="name" value={infoActivity.name} onChange={fillInfoActivity} />
                        {errors.name ? <p className={styles.errorText}>{errors.name}</p> : ""}
                    </div>
                    <div>
                        <label className={styles.textForm}>Dificultad: </label>
                        <select className={styles.optionsForm} name="dificulty" value={infoActivity.dificulty} onChange={fillInfoActivity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <label className={styles.textForm}>Hora de inicio: </label>
                        <input className={styles.optionsForm} name="startTime" type="time" onChange={calculateDuration} value={time.startTime} />
                        <label className={styles.textForm}>Hora fin: </label>
                        <input className={styles.optionsForm} name="finishTime" type="time" onChange={calculateDuration} value={time.finishTime} />
                        <div>
                            <label className={styles.textForm}>Duración total: </label>
                            <label className={styles.textForm}>{infoActivity.duration} Horas</label>
                            {errors.duration ? <p className={styles.errorText}>{errors.duration}</p> : ""}
                        </div>
                    </div>
                    <div>
                        <label className={styles.textForm}>Temporada: </label>
                        <select className={styles.optionsForm} name="season" value={infoActivity.season} onChange={fillInfoActivity}>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Atumn">Atumn</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </div>
                    <div>
                        <div className={styles.addCountryContainer}>
                        <label className={styles.textForm}>Selecciona el país o paises: </label>
                        <input className={styles.optionsForm} list="data" type="text" value={inputCountryValue} onChange={handleChange} />
                        <datalist id="data">
                            {
                                countries.map((country) => {
                                    return <option>{country.name}</option >
                                })
                            }
                        </datalist>
                        <button className={styles.buttonAddCountry} type="button" onClick={() => { handleButtonCountries() }}>
                            <img className={styles.buttonAddCountryIcon} src={addIcon} alt="" />
                        </button>
                        </div>
                    </div>
                    <div>
                        {
                            addCountries.map((country) => {
                                return (<button className={styles.buttonCountry} type="button" onClick={() => { deleteCountry(country.name, country.id) }}>{country.name} x</button>)
                            })
                        }
                        {errors.countries ? <p className={styles.errorText}>{errors.countries}</p> : ""}
                    </div>
                    <button className={styles.buttonCreateForm}  type="submit">Crear actividad</button>
                </form>
            </div>
        </div>
    )
}

export default Form; 