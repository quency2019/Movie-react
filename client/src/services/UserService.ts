import axios from "axios";
import { IResponseData, IResponseError } from "./CommonTypes";

export interface IUser {
    _id?: string
    username: string,
    password: string,
    name: string,
    phone: number
}

export interface IUserCondition {
    page?: number
    limit?: number
    key?: string
}

export class UserService {
    public static async add(user: IUser): Promise<IResponseData<IUser> | IResponseError> {
        const res = await axios.post("/api/user/add", user)
        return res.data

    }
    public static async delete(id: string): Promise<IResponseData<IUser> | IResponseError> {
        const res = await axios.delete("/api/user/" + id)
        return res.data

    }
    public static async edit(id: string, user: IUser): Promise<IResponseData<IUser> | IResponseError> {
        const res = await axios.put("/api/user/" + id, user)
        return res.data

    }
    public static async find(condition: IUserCondition): Promise<IResponseData<IUser> | IResponseError> {
        const res = await axios.get("/api/user/", {
            params: condition
        })
        console.log(res)
        return res.data

    }

    public static async findById(id: string): Promise<IResponseData<IUser> | IResponseError> {
        const res = await axios.get("/api/user/" + id)
        return res.data

    }
}

