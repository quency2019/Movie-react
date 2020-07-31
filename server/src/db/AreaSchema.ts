import Mongoose from "mongoose"
import { Area as Area } from "../entities/movieAreas"

export interface IArea extends Area, Mongoose.Document { }

/**
 * area：上映地区
 */
const areaSchema = new Mongoose.Schema<IArea>({
    area: String,
    isShow: Boolean
}, {
    versionKey: false
})

export default Mongoose.model<IArea>("Area", areaSchema)