import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByActivity, getAllCountries, getCountriesByContinent, orderCountries} from "../../redux/actions";
import style from "./filters.module.css"


const Filters = () => {

    const countries = useSelector((state) => state.countries);
    const dispatch = useDispatch()
    const [filtersValue, setFiltersValue] = useState({
        continent: "",
        order: "",
        activity: "",
    })
    const [activities, setActivities] = useState([])
    useEffect(()=>{
        fetch("http://localhost:3001/activities")
        .then((data) => data.json())
        .then((data) => setActivities(data))
    },[])

    const handleSelectContinent = (event) => {
        dispatch(getCountriesByContinent(event.target.value))
        setFiltersValue({ ...filtersValue, continent: event.target.value })
    }

    const handleSelectActivity = (event) => {   
        const namesContries = activities.map((activity) =>{
            if(event.target.value === activity.name){
                return activity.Countries
            }
        })
        dispatch(getCountriesByActivity(namesContries))
        setFiltersValue({ ...filtersValue, activity: event.target.value })
    }

    const handleSelectOrder = (event) => {
        setFiltersValue({ ...filtersValue, order: event.target.value })
        dispatch(orderCountries(event.target.value))
    }

    const handleButtonClear = () => {
        dispatch(getAllCountries())
        setFiltersValue({ continent: "", order: "", activity: "" })
    }

    console.log(activities)

    return (
        <div className={style.filtersContainer}>
            <select className={style.filtersSelect} name="continent" onChange={handleSelectContinent} value={filtersValue.continent} >
                <option value="" disabled selected hidden>Continente</option>
                <option>Africa</option>
                <option>Americas</option>
                <option>Antarctic</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Oceania</option>
            </select>
            <select className={style.filtersSelect} onChange={handleSelectActivity} value={filtersValue.activity}>
                <option value="" disabled selected hidden>Actividad</option>
                {
                    activities.map((activity) => {
                        return <option>{activity.name}</option>
                    })
                }
            </select>
            <select className={style.filtersSelect} name="order" value={filtersValue.order} onChange={handleSelectOrder}>
                <option value="" disabled selected hidden>Orden</option>
                <option>Alfabeticamente ascendente</option>
                <option>Alfabeticamente descendente</option>
                <option>Por poblacion ascendente</option>
                <option>Por poblacion descendente</option>
            </select>
            <button className={style.buttonClean} onClick={() => { handleButtonClear() }}>Limpiar</button>
        </div>
    );
};

export default Filters