

import Mongoose from "mongoose"
import { Types as Type } from "../entities/movieTypes"

export interface IType extends Type, Mongoose.Document { }

/**
 * types:电影类型
 */
const typeSchema = new Mongoose.Schema<IType>({

    types: String,
    isShow: Boolean

}, {
    versionKey: false
})

export default Mongoose.model<IType>("Type", typeSchema)