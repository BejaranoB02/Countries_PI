import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getCountriesByContinent, orderCountries } from "../../redux/actions";
import style from "./filters.module.css"


const Filters = (props) => {

    const countries = useSelector((state) => state.countries);
    const dispatch = useDispatch()
    const [filtersValue, setFiltersValue] = useState({
        continent: "",
        order: "",
    })

    const handleSelectContinent = (event) => {
        dispatch(getCountriesByContinent(event.target.value))
        setFiltersValue({ ...filtersValue, continent: event.target.value })
    }

    const handleSelectOrder = (event) => {
        setFiltersValue({ ...filtersValue, order: event.target.value })
        dispatch(orderCountries(event.target.value))
    }

    const handleButtonClear = (setNameCountry) => {
        dispatch(getAllCountries())
        setFiltersValue({ continent: "", order: "" })
    }

    return (
        <div className={style.filtersContainer}>
            <label className={style.filtersText}>Filtrar por continente: </label>
            <select className={style.filtersSelect} name="continent" onChange={handleSelectContinent} value={filtersValue.continent}>
                <option></option>
                <option>Africa</option>
                <option>Americas</option>
                <option>Antarctic</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Oceania</option>
            </select>
            <label className={style.filtersText} name>Orden: </label>
            <select className={style.filtersSelect} name="order" value={filtersValue.order} onChange={handleSelectOrder}>
                <option></option>
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