import { setUserIsLoadingAction, setUserAction, deleteUserAction } from "../actions/userAction";
import { put, select, call } from "redux-saga/effects";
import { UserService } from "../../services/UserService";

export function* asyncFetchUser() {
    try {
        yield put(setUserIsLoadingAction(true));
        const condition = yield select(state => state.user.condition)
        const res = yield call(UserService.find, condition);
        yield put(setUserAction(res.data, res.total))
        yield put(setUserIsLoadingAction(false));
    } catch (e) {
        console.log(e)
    }
}

export function* asyncDeleteUser(action: deleteUserAction) {
    try {
        yield call(UserService.delete, action.payload)

    } catch (e) {
        console.log(e)
    }
}