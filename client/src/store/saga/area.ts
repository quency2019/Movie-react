
import { call, put } from "redux-saga/effects";
import { setMovieAreaAction, deleteMovieAreaAction, changeMovieAreaAction, editMovieAreaAction } from "../actions/movieAreaAction";
import { MovieAreaService } from "../../services/MovieAreaService";


export function* asyncFetchArea() {
    try {
        const res = yield call(MovieAreaService.find);
        yield put(setMovieAreaAction(res.total, res.data))
    } catch (e) {
        console.log(e)
    }
}
export function* asyncDeleteArea(actions: deleteMovieAreaAction) {
    try {
        yield call(MovieAreaService.delete, actions.payload);
    } catch (e) {
        console.log(e)
    }
}

export function* asyncChangeArea(actions: changeMovieAreaAction) {
    try {
        yield call(MovieAreaService.edit, actions.payload._id, {
            isShow: actions.payload.isShow
        });
    } catch (e) {
        console.log(e)
    }
}

export function* asyncEditArea(actions: editMovieAreaAction) {
    try {
        yield call(MovieAreaService.edit, actions.payload._id, {
            area: actions.payload.area
        });
    } catch (e) {
        console.log(e)
    }
}