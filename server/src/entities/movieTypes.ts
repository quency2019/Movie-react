import { Type } from "class-transformer";
import { BaseFunc } from "./baseFunc";
import { IsNotEmpty } from "class-validator";


export class Types extends BaseFunc {

    // 电影上映区域
    @IsNotEmpty({ message: "电影类型不能为空" })
    @Type(() => String)
    public types!: string

    @IsNotEmpty({ message: "电影类型是否显示不能为空" })
    @Type(() => Boolean)
    public isShow!: boolean;


    public static tranform(plainObj: object): Types {
        return super.baseTranform(Types, plainObj)

    }


}