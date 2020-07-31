import { IResponseData, IResponseError } from "./CommonTypes"
import axios from 'axios'
export interface IMovieType {
    _id?: string,
    types: string,
    isShow: boolean
}
export class MovieTypeService {
    public static async add(type: IMovieType): Promise<IResponseData<IMovieType> | IResponseError> {
        const { data } = await axios.post("/api/type/add", type)
        return data

    }
    public static async edit(id: string, type: Partial<IMovieType>): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.put("/api/type/" + id, type)
        return data

    }
    public static async delete(id: string): Promise<IResponseData<IMovieType> | IResponseError> {
        const { data } = await axios.delete("/api/type/" + id)
        return data


    }
    public static async find(): Promise<IResponseData<IMovieType> | IResponseError> {
        const { data } = await axios.get("/api/type")
        return data

    }
}

