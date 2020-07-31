import { IResponseData, IResponseError } from "./CommonTypes"
import axios from 'axios'
export interface IMovieArea {
    _id?: string,
    area: string,
    isShow: boolean
}
export class MovieAreaService {
    public static async add(area: IMovieArea): Promise<IResponseData<IMovieArea> | IResponseError> {
        const { data } = await axios.post("/api/area/add", area)
        return data

    }
    public static async edit(id: string, area: Partial<IMovieArea>): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.put("/api/area/" + id, area)
        return data

    }
    public static async delete(id: string): Promise<IResponseData<IMovieArea> | IResponseError> {
        const { data } = await axios.delete("/api/area/" + id)
        return data


    }
    public static async find(): Promise<IResponseData<IMovieArea> | IResponseError> {
        const { data } = await axios.get("/api/area")
        return data

    }
}

