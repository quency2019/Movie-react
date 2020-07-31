import { Movie } from "../entities/movie";
import { IMovie } from "../db/MovieSchema";
import { MovieModel } from "../db/db";
import { SearchCondition } from "../entities/searchCondition";
import { ISearchResult } from "../entities/CommonTypes";


export class MovieService {
    // 添加操作
    public static async add(movie: Movie): Promise<IMovie | string[]> {

        // 转换movie类型
        movie = Movie.tranform(movie)

        // 验证信息完整
        const errors = await movie.validataThis()
        if (errors.length > 0) {
            return errors
        }

        // 添加电影
        const result = MovieModel.create(movie)
        return result

    }
    // 修改操作
    public static async updata(id: string, movie: Movie): Promise<string[]> {
        // 转换movie类型
        const movieObj = Movie.tranform(movie)

        // 验证信息完整
        const errors = await movieObj.validataThis(true)
        if (errors.length > 0) {
            return errors
        }

        // 修改电影
        const res = await MovieModel.updateOne({ _id: id }, movie)
        // console.log(res)
        return errors
    }


    public static async delete(id: string): Promise<void> {
        await MovieModel.deleteOne({ _id: id })
        console.log("删除成功")

    }
    public static async findById(id: string): Promise<IMovie | null> {
        const res = await MovieModel.findById({ _id: id })
        return res

    }

    // 按条件查询
    public static async findByCondition(searchCondition: SearchCondition): Promise<ISearchResult<IMovie>> {
        // 转换searchCondition类型
        searchCondition = SearchCondition.tranform(searchCondition)

        // 验证信息完整
        const errors = await searchCondition.validataThis(true)
        if (errors.length > 0) {
            return {
                data: [],
                count: 0,
                errors
            }
        }

        // 查询
        const data = await MovieModel.find({
            name: { $regex: new RegExp(searchCondition.key) }
        }).skip((searchCondition.page - 1) * searchCondition.limit).limit(searchCondition.limit)
        const count = await MovieModel.find({
            name: { $regex: new RegExp(searchCondition.key) }
        }).countDocuments()

        console.log(count)
        return {
            data,
            count,
            errors
        }
    }




}