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
    const [errors, setErrors] = useState({})
    const [duration, setDuration] = useState("0")
    const [infoActivity, setInfoActivity] = useState({
        name: "",
        dificulty: 1,
        duration: "00:00",
        season: "spring",
        countries: [],
    })

    const fillInfoActivity = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        if(event.target.name === "dificulty"){
            value = parseInt(value)
            console.log(value)
        }
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
            }
        }
    }

    const deleteCountry = (countryName, id) => {
        setAddCountries(addCountries.filter((country) => country.name !== countryName))
        setInfoActivity({ ...infoActivity, countries: infoActivity.countries.filter((countryId) => countryId !== id) })
        setErrors(validation({ ...infoActivity, countries: infoActivity.countries.filter((countryId) => countryId !== id) }))
    }

    const handleDuration = (event) => {
        
        setDuration(event.target.value)

        let hours = event.target.value
        let duration = hours + ":00" 
        if (event.target.value < 10){
            duration = "0" + duration;
        };

        setInfoActivity({ ...infoActivity, duration: duration })
        setErrors(validation({ ...infoActivity, duration: duration }))
    }

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    const postActivty = (event) => {
        if(errors.name || errors.countries || errors.duration){
            alert("Los parametros de la actividad no son permitidos")
            event.preventDefault()
        }else{
            event.preventDefault()
            axios.post("http://localhost:3001/activities", infoActivity)
                .then(() => alert("La actividad fue creada con exito"))
                .catch((error) => console.log(error))
        }        
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
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div>
                        <label className={styles.textForm}>Duración: </label>
                      <input type="number" className={styles.optionsForm} min={0} value={duration} onChange={handleDuration}/>
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
                    </div>
                    <button className={styles.buttonCreateForm}>Crear actividad</button>
                </form>
            </div>
        </div>
    )
}

export default Form; 