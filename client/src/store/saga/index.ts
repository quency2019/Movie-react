import { takeEvery } from "redux-saga/effects";
import { asyncFetchMovie, asyncDeleteMovie, asyncEditSwitch } from "./movie";
import { asyncDeleteType, asyncFetchType, asyncChangeType } from "./type";
import { asyncDeleteArea, asyncFetchArea, asyncChangeArea } from "./area";
import { asyncFetchUser, asyncDeleteUser } from "./user";


export function* mySaga() {
    yield takeEvery("fetch_movie", asyncFetchMovie)
    yield takeEvery("fetch_movie_type", asyncFetchType)
    yield takeEvery("fetch_movie_area", asyncFetchArea)
    yield takeEvery("movie_switch", asyncEditSwitch)
    yield takeEvery("delete_movie", asyncDeleteMovie)
    yield takeEvery("delete_movie_type", asyncDeleteType)
    yield takeEvery("delete_movie_area", asyncDeleteArea)
    yield takeEvery("change_movie_area", asyncChangeArea)
    yield takeEvery("change_movie_type", asyncChangeType)
    yield takeEvery("change_movie_type", asyncChangeType)
    yield takeEvery("fetch_user", asyncFetchUser)
    yield takeEvery("delete_user", asyncDeleteUser)

}

