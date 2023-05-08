import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import validation from "./validation";

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
        setInfoActivity({... infoActivity, [name] : value})
        setErrors(validation({... infoActivity, [name] : value}))

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

        const result = searchCountry(inputCountryValue)
        const id = result.id
        setAddCountries([...addCountries, result]);
        setInputCountryValue("");
        setInfoActivity({ ...infoActivity, countries: [...infoActivity.countries, id] })
        setErrors(validation({... infoActivity, countries: [...infoActivity.countries, id]}))
    }

    const deleteCountry = (countryName, id) => {
        setAddCountries(addCountries.filter((country) => country.name !== countryName))
        setInfoActivity({ ...infoActivity, countries: infoActivity.countries.filter((countryId) => countryId !== id) })
        setErrors(validation({... infoActivity, countries: infoActivity.countries.filter((countryId) => countryId !== id) }))
    }

    const calculateDuration = (event) => {
        let totalStartMinutes = 0
        let totalFinishMinutes = 24 * 60
        if (event.target.name === "startTime") {
            setTime({
                startTime: event.target.value,
            })
            totalStartMinutes = parseInt(event.target.value.substring(0, 2)) * 60 + parseInt(event.target.value.substring(3))
        }
        if (event.target.name === "finishTime") {
            setTime({
                finishTime: event.target.value,
            })
            totalFinishMinutes = parseInt(event.target.value.substring(0, 2)) * 60 + parseInt(event.target.value.substring(3))
        }
        let hours = Math.floor((totalFinishMinutes - totalStartMinutes) / 60)
        let minutes = (totalFinishMinutes - totalStartMinutes) - (hours * 60)

        if (minutes < 10) {
            minutes = "0" + minutes.toString()
        } else {
            minutes = minutes.toString()
        }

        let duration = hours.toString() + ":" + minutes

        setInfoActivity({ ...infoActivity, duration: duration })
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

    return (
        <form onSubmit={postActivty}>
            <h1>Crea una actividad turistica</h1>
            <div>
                <label>Nombre de la actividad: </label>
                <input name="name" value={infoActivity.name} onChange={fillInfoActivity} />
                {errors.name ? <p>{errors.name}</p> : ""}
            </div>
            <div>
                <label>Dificultad: </label>
                <select name="dificulty" value={infoActivity.dificulty} onChange={fillInfoActivity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div>
                <label>Hora de inicio: </label>
                <input name="startTime" type="time" onChange={calculateDuration} value={time.startTime} />
                <label>Hora fin: </label>
                <input name="finishTime" type="time" onChange={calculateDuration} value={time.finishTime} />
                <div>
                    <label>Duración total: </label>
                    <label>{infoActivity.duration}</label>
                </div>
            </div>
            <div>
                <label>Temporada: </label>
                <select name="season" value={infoActivity.season} onChange={fillInfoActivity}>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Atumn">Atumn</option>
                    <option value="Winter">Winter</option>
                </select>
            </div>
            <div>
                <label>Selecciona el país o paises: </label>
                <input list="data" type="text" value={inputCountryValue} onChange={handleChange} />
                <datalist id="data">
                    {
                        countries.map((country) => {
                            return <option>{country.name}</option >
                        })
                    }
                </datalist>
                <button type="button" onClick={() => { handleButtonCountries() }}>agregar</button>
            </div>
            <div>
                {
                    addCountries.map((country) => {
                        return (<button type="button" onClick={() => { deleteCountry(country.name, country.id) }}>{country.name} x</button>)
                    })
                }
                {errors.countries ? <p>{errors.countries}</p> : ""}
            </div>
            <p>hola</p>
            <button type="submit">Crear actividad</button>
        </form>
    )
}

export default Form; 