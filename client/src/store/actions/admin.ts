import { IAdmin } from "../reducers/adminReducer"

export interface adminAction {
    type: "admin"

}
export function adminAction(): adminAction {
    return {
        type: "admin"
    }
}
export interface setLoginAdminAction {
    type: "set_login_admin",
    payload: IAdmin

}
export function setLoginAdminAction(admin: IAdmin): setLoginAdminAction {
    return {
        type: "set_login_admin",
        payload: admin
    }
}

export type adminActions = setLoginAdminAction | adminAction