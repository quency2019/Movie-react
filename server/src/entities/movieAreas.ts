import { Type } from "class-transformer";
import { BaseFunc } from "./baseFunc";
import { IsNotEmpty } from "class-validator";


export class Area extends BaseFunc {

    // 电影上映区域
    @IsNotEmpty({ message: "上映地区不能为空" })
    @Type(() => String)
    public area!: string

    @IsNotEmpty({ message: "电影上映地区是否显示不能为空" })
    @Type(() => Boolean)
    public isShow!: boolean;

    public static tranform(plainObj: object): Area {
        return super.baseTranform(Area, plainObj)

    }


}