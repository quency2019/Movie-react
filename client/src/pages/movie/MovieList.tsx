import MovieTable from "../../components/MovieTable"
import { connect } from "react-redux"
import { IRootState } from '../../store/reducers/reducers'
import { Dispatch } from "react"
import { movieActions, fetchMovieAction, changeSwitchAction, deleteMovieAction, setConditionAction } from "../../store/actions/movieAction"
import { SwitchType } from "../../services/CommonTypes"

function mapStateToProps(state: IRootState) {
    return state.movie
}
function mapDispatchToProps(dispatch: Dispatch<movieActions>) {
    return {
        onLoad() {
            dispatch(setConditionAction({
                page: 1,
                limit: 10,
                key: ""
            }))
            dispatch(fetchMovieAction())
        },
        onSwitchChange(type: SwitchType, val: boolean, id: string) {
            // console.log(type, val, id)
            dispatch(changeSwitchAction(type, val, id))
        },
        onDeleteMovie(id: string) {
            dispatch(deleteMovieAction(id))
            dispatch(fetchMovieAction())
        },
        onChangePage(page: number) {
            dispatch(setConditionAction({
                page
            }))
            dispatch(fetchMovieAction())
        },
        onKeyChange(key: string) {
            dispatch(setConditionAction({
                key
            }))

        },
        onSearch() {
            dispatch(setConditionAction({
                page: 1
            }))
            dispatch(fetchMovieAction())
        }

    }

}


export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)
