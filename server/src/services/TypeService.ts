import { TypesModel } from "../db/db";
import { IType } from "../db/TypeSchema";
import { Types } from "../entities/movieTypes";
import { ISearchResult } from "../entities/CommonTypes";


export class TypeService {
    // 添加操作

    public static async deleteTypes(id: string): Promise<void> {
        await TypesModel.deleteOne({ _id: id })

    }

    public static async addTypes(type: Types): Promise<IType | string[]> {
        // 转换type类型
        const typeObj = Types.tranform(type)

        // 验证信息完整
        const errors = await typeObj.validataThis()
        if (errors.length > 0) {
            return errors
        }
        const result = TypesModel.create(type)
        return result

    }
    // 修改操作
    public static async updataTypes(id: string, type: Types) {
        const typeObj = Types.tranform(type)

        // 验证信息完整
        const errors = await typeObj.validataThis(true)
        if (errors.length > 0) {
            return errors
        }
        // 修改type
        try {
            const res = await TypesModel.updateOne({ _id: id }, typeObj);
        } catch (error) {
            console.log(error)

        }

        return errors

    }

    public static async findType(): Promise<ISearchResult<IType>> {
        const data = await TypesModel.find()

        // 查询
        const count = await TypesModel.find().countDocuments()

        return {
            data,
            count,
            errors: []
        }


    }


}