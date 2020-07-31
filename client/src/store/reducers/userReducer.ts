import { IUser, IUserCondition } from "../../services/UserService";
import { UserActions, setUserAction, setSearchUserConditionAction, deleteUserAction, setUserIsLoadingAction } from "../actions/userAction";

export interface IUserState {
    data: IUser[],
    total: number,
    condition: IUserCondition,
    isLoading: boolean,
    totalPage: number
}

const defaultState = {
    data: [],
    total: 0,
    condition: {
        key: "",
        limit: 10,
        page: 1
    },
    isLoading: false,
    totalPage: 0
}
function setUser(state: IUserState, action: setUserAction): IUserState {
    const newState: IUserState = {
        ...state,
        ...action.payload,

    }
    newState.totalPage = Math.ceil(newState.total / newState.condition.limit!)
    return newState

}
function setIsLoading(state: IUserState, action: setUserIsLoadingAction): IUserState {
    return {
        ...state,
        isLoading: action.payload
    }

}

function setCondition(state: IUserState, action: setSearchUserConditionAction): IUserState {
    return {
        ...state,
        condition: action.payload
    }

}
function deleteUser(state: IUserState, action: deleteUserAction) {
    const res = state.data.filter(it => it._id !== action.payload)
    return {
        ...state,
        data: res,
        total: state.total - 1,
        totalPage: Math.ceil((state.total - 1) / state.condition.limit!)
    }
}

export function userReducer(state: IUserState = defaultState, action: UserActions) {
    switch (action.type) {
        case "set_user":
            return setUser(state, action);
        case "set_user_condition":
            return setCondition(state, action);
        case "delete_user":
            return deleteUser(state, action);
        case "set_user_isloading":
            return setIsLoading(state, action)
        default:
            return state
    }
}