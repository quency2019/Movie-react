import axios from 'axios'
import { IResponseData, IResponseError, IResponsePageData } from './CommonTypes'
export interface IMovie {
    _id?: string,
    name: string,
    types: string[],
    area: string[],
    timelong: number,
    isHot: boolean,
    isComing: boolean,
    isClassic: boolean,
    discription: string,
    poster: string,
}

interface ICondition {
    page?: number
    limit?: number
    key?: string
}

export class MovieService {
    public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.post("/api/movie", movie)
        return data

    }
    public static async edit(id: string, movie: Partial<IMovie>): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.put("/api/movie/" + id, movie)
        return data

    }
    public static async delete(id: string): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.delete("/api/movie/" + id)
        return data

    }
    public static async findById(id: string): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.get("/api/movie/" + id)
        return data

    }
    public static async findByCondition(condition: ICondition): Promise<IResponsePageData<IMovie>> {
        const { data } = await axios.get("/api/movie/", {
            params: condition
        })
        return data

    }
}
