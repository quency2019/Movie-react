import { Area } from "../entities/movieAreas"
import { IArea } from "../db/AreaSchema"
import { AreasModel } from "../db/db"
import { ISearchResult } from "../entities/CommonTypes"



export class AreaService {
    // 添加操作

    public static async deleteAreas(id: string): Promise<void> {
        await AreasModel.deleteOne({ _id: id })
        console.log("删除成功")

    }

    public static async addAreas(area: Area): Promise<IArea | string[]> {
        // 转换type类型
        const areaobj = Area.tranform(area)

        // 验证信息完整
        const errors = await areaobj.validataThis()
        if (errors.length > 0) {
            return errors
        }
        const result = AreasModel.create(area)
        return result

    }
    // 修改操作
    public static async updataAreas(id: string, area: Area) {
        const areaObj = Area.tranform(area)

        // 验证信息完整
        const errors = await areaObj.validataThis(true)
        if (errors.length > 0) {
            return errors
        }
        // 修改area
        const res = await AreasModel.updateOne({ _id: id }, area)
        return errors
    }

    public static async findArea(): Promise<ISearchResult<IArea>> {

        const data = await AreasModel.find()

        // 查询
        const count = await AreasModel.find().countDocuments()

        console.log(count)
        return {
            data,
            count,
            errors: []
        }


    }


}