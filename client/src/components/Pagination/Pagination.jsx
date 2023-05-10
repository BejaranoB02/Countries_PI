import { useDispatch, useSelector } from "react-redux"
import { nextPage, prevPage } from "../../redux/actions"
import styles from "./pagination.module.css"

const Pagination = (props) => {

    const dispatch = useDispatch()
    const numPage = useSelector((state) => state.numPage)
    const cantPages = props.cantPages
    console.log(cantPages)

    const next = () => {
        dispatch(nextPage())
    }

    const prev = () => {
        dispatch(prevPage())
    }

    return (
        <div className={styles.paginationContainer}>
            {numPage > 1 && <button className={styles.buttonPagination} onClick={prev}>Antertior</button>}
            <button className={styles.buttonPagination}>{numPage}</button>
            {numPage < cantPages && <button className={styles.buttonPagination} onClick={next}>Siguiente</button>}
        </div>

    )
}

export default Pagination;