import { IUser, IUserCondition } from "../../services/UserService";

export interface setUserAction {
    type: "set_user",
    payload: {
        data: IUser[],
        total: number
    }
}
export function setUserAction(users: IUser[], total: number): setUserAction {
    return {
        type: "set_user",
        payload: {
            data: users,
            total,
        }
    }
}

export interface setUserIsLoadingAction {
    type: "set_user_isloading",
    payload: boolean
}
export function setUserIsLoadingAction(isLoading: boolean): setUserIsLoadingAction {
    return {
        type: "set_user_isloading",
        payload: isLoading
    }
}
export interface deleteUserAction {
    type: "delete_user",
    payload: string
}
export function deleteUserAction(id: string): deleteUserAction {
    return {
        type: "delete_user",
        payload: id
    }
}
export interface fetchUserAction {
    type: "fetch_user",

}
export function fetchUserAction(): fetchUserAction {
    return {
        type: "fetch_user",

    }
}

export interface setSearchUserConditionAction {
    type: "set_user_condition",
    payload: IUserCondition

}
export function setSearchUserConditionAction(condition: IUserCondition): setSearchUserConditionAction {
    return {
        type: "set_user_condition",
        payload: condition

    }
}



export type UserActions = setSearchUserConditionAction | deleteUserAction | setUserAction | setUserIsLoadingAction | fetchUserAction
