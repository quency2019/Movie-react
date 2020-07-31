import { UserModel } from "../db/db"
import { IUser } from "../db/UserSchema"
import { User } from "../entities/user"
import { ISearchResult } from "../entities/CommonTypes"
import { SearchUserCondition } from "../entities/searchUserCondition"


export default class UserService {

    // 添加用户操作
    public static async addUser(user: User): Promise<IUser | string[]> {
        const userObj = User.tranform(user)
        const errors = await userObj.validataThis()
        if (errors.length > 0) {
            return errors
        }
        const result = await UserModel.create(userObj)
        return result
    }
    // 删除用户操作
    public static async deleteUser(id: string): Promise<void> {
        const res = await UserModel.deleteOne({ _id: id })
        console.log(res, "删除成功")

    }

    // 修改用户
    public static async updateUser(id: string, user: User): Promise<string[]> {
        const userObj = User.tranform(user)
        const errors = await userObj.validataThis(true)
        if (errors.length > 0) {
            return errors
        }
        const result = await UserModel.updateOne({ _id: id }, user)
        return errors
    }
    // 查询单个用户操作
    public static async findUserById(id: string): Promise<IUser | null> {
        const res = await UserModel.findById({ _id: id })
        return res
    }
    //  查询全部用户操作
    public static async findUser(): Promise<ISearchResult<IUser>> {
        const res = await UserModel.find()
        const count = await UserModel.find().countDocuments()
        return {
            data: res,
            count,
            errors: []
        }
    }

    //  按条件查询全部用户操作
    public static async searchUser(searchUserCondition: SearchUserCondition): Promise<ISearchResult<IUser>> {
        // 转换searchCondition类型
        searchUserCondition = SearchUserCondition.tranform(searchUserCondition)

        // 验证信息完整
        const errors = await searchUserCondition.validataThis(true)

        if (errors.length > 0) {
            return {
                data: [],
                count: 0,
                errors
            }
        }

        // 查询
        const data = await UserModel.find({
            username: { $regex: new RegExp(searchUserCondition.key) }
        }).skip((searchUserCondition.page - 1) * searchUserCondition.limit).limit(searchUserCondition.limit)
        const count = await UserModel.find({
            username: { $regex: new RegExp(searchUserCondition.key) }
        }).countDocuments()

        return {
            data,
            count,
            errors
        }
    }
}


