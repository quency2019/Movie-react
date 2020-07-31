import Mongoose from "mongoose"
import { Movie } from "../entities/movie"

export interface IMovie extends Movie, Mongoose.Document { }

/**
 * name:电影名称，types:电影类型，area：上映地区，timelong：时长，isHot:是否热映，iscoming:是否正在上映，isclassic:是否经典，
 * discription？:电影描述，poster？:海报图
 */
const movieSchema = new Mongoose.Schema<IMovie>({
    name: String,
    types: [String],
    area: [String],
    timelong: Number,
    isHot: Boolean,
    isComing: Boolean,
    isClassic: Boolean,
    discription: String,
    poster: String
}, {
    versionKey: false
})

export default Mongoose.model<IMovie>("Movie", movieSchema)