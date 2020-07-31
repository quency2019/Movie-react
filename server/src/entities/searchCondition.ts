import { plainToClass, Type } from "class-transformer";
import { Min, MinLength, IsNotEmpty, ArrayMinSize, IsInt, Max, IsArray, validate } from "class-validator";
import { BaseFunc } from "./baseFunc";


export class SearchCondition extends BaseFunc {
    // 当前页码，默认为1
    @Min(1, { message: "当前页面最小为1" })
    @IsInt({ message: "当前页面必须为整数" })
    @Type(() => Number)
    page: number = 1;

    // 限制每页显示几条,默认为10
    @Min(1, { message: "每页显示最小为1" })
    @IsInt({ message: "当前页面必须为整数" })
    @Type(() => Number)
    limit: number = 10;

    // 查询条件,默认为空
    @Type(() => String)
    key: string = ""


    public static tranform(plainObj: object): SearchCondition {
        return super.baseTranform(SearchCondition, plainObj)

    }


}