import { call, put, select, } from 'redux-saga/effects'
import { setLoadingAction, setMovieAction, deleteMovieAction, changeSwitchAction } from '../actions/movieAction';
import { MovieService } from '../../services/MovieService';


export function* asyncFetchMovie() {
    try {
        yield put(setLoadingAction(true));
        const condition = yield select(state => state.movie.searchConditons)

        const res = yield call(MovieService.findByCondition, condition);
        yield put(setMovieAction(res.data, res.total))

        yield put(setLoadingAction(false));
    } catch (e) {
        console.log(e)
    }
}

export function* asyncDeleteMovie(action: deleteMovieAction) {
    try {
        yield call(MovieService.delete, action.payload)
    } catch (e) {
        console.log(e)
    }
}

export function* asyncEditSwitch(action: changeSwitchAction) {

    try {
        yield call(MovieService.edit, action.payload.id, {
            [action.payload.type]: action.payload.newVal
        })

    } catch (e) {
        console.log(e)
    }
}