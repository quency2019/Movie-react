import { MovieTypeService } from "../../services/MovieTypeService";
import { call, put } from "redux-saga/effects";
import { setMovieTypeAction, deleteMovieTypeAction, changeMovieTypeAction, editMovieTypeAction } from "../actions/movieTypeAction";

export function* asyncFetchType() {
    try {
        const res = yield call(MovieTypeService.find);
        yield put(setMovieTypeAction(res.total, res.data))
    } catch (e) {
        console.log(e)
    }
}
export function* asyncDeleteType(actions: deleteMovieTypeAction) {
    try {
        yield call(MovieTypeService.delete, actions.payload);
    } catch (e) {
        console.log(e)
    }
}

export function* asyncChangeType(actions: changeMovieTypeAction) {
    try {
        yield call(MovieTypeService.edit, actions.payload._id, {
            isShow: actions.payload.isShow
        });
    } catch (e) {
        console.log(e)
    }
}

export function* asyncEditType(actions: editMovieTypeAction) {
    try {
        yield call(MovieTypeService.edit, actions.payload._id, {
            types: actions.payload.types
        });
    } catch (e) {
        console.log(e)
    }
}