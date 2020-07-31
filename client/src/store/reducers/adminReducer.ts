
import { adminActions } from "../actions/admin";

export interface IAdmin {
    username: string,
    password: string
}
export interface IAdminState {
    data: IAdmin[],
    loginAdmin: object

}
const defaultState = {
    data: [{
        username: "admin",
        password: "123456"
    }],
    loginAdmin: {}

}


export function adminReducer(state: IAdminState = defaultState, action: adminActions) {
    switch (action.type) {
        case "admin":
            return state;
        case "set_login_admin":
            return { ...state, loginAdmin: action.payload };
        default:
            return state;
    }
}