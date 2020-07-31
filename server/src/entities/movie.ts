import { Min, MinLength, IsNotEmpty, ArrayMinSize, IsInt, Max, IsArray, validate } from "class-validator";
import { Type, plainToClass } from "class-transformer";
import { BaseFunc } from "./baseFunc";


/**
 * name:电影名称，types:电影类型，area：上映地区，timelong：时长，isHot:是否热映，iscoming:是否正在上映，isclassic:是否经典，
 * discription？:电影描述，poster？:海报图
 */
export class Movie extends BaseFunc {

    @IsNotEmpty({ message: "电影名称不能为空" })
    @Type(() => String)
    public name!: string;

    @ArrayMinSize(1, { message: "电影类型至少有一个" })
    @IsNotEmpty({ message: "电影类型不能为空" })
    @IsArray({ message: "电影类型必须是数组" })
    @Type(() => String)
    public types!: string[];

    @ArrayMinSize(1, { message: "电影上映地区至少有一个" })
    @IsNotEmpty({ message: "上映地区不能为空" })
    @IsArray({ message: "上映地区必须是数组" })
    @Type(() => String)
    public area!: string[];

    @Max(99999, { message: "电影时长最长为99999分钟" })
    @Min(2, { message: "电影时长最短为2分钟" })
    @IsInt({ message: "电影时长必须为整数" })
    @IsNotEmpty({ message: "电影时长不能为空" })
    @Type(() => Number)
    public timelong!: number;

    @IsNotEmpty({ message: "电影是否热映不能为空" })
    @Type(() => Boolean)
    public isHot?: boolean = false;

    @IsNotEmpty({ message: "电影是否正在上映不能为空" })
    @Type(() => Boolean)
    public isComing?: boolean = false;

    @IsNotEmpty({ message: "电影是否经典不能为空" })
    @Type(() => Boolean)
    public isClassic?: boolean = false;

    @Type(() => String)
    public discription?: string;

    @Type(() => String)
    public poster?: string;

    public static tranform(plainObj: object): Movie {
        return super.baseTranform(Movie, plainObj)
    }



}