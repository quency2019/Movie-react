import { MinLength, IsNotEmpty, MaxLength } from "class-validator";
import { Type, } from "class-transformer";
import { BaseFunc } from "./baseFunc";


/**
 * name:用户名，passward：密码
 */
export class User extends BaseFunc {

    @IsNotEmpty({ message: "用户名不能为空" })
    @MaxLength(18, { message: "用户密码长度不能超过18" })
    @MinLength(3, { message: "用户密码长度不能短于6" })
    @Type(() => String)
    public username!: string;

    @IsNotEmpty({ message: "用户密码不能为空" })
    @MaxLength(18, { message: "用户密码长度不能超过18" })
    @MinLength(6, { message: "用户密码长度不能短于6" })
    @Type(() => String)
    public password!: string;

    @IsNotEmpty({ message: "用户名字不能为空" })
    @MaxLength(18, { message: "用户名字长度不能超过18" })
    @MinLength(3, { message: "用户名字长度不能短于6" })
    @Type(() => String)
    public name!: string;

    @IsNotEmpty({ message: "用户电话号码不能为空" })
    @MaxLength(11, { message: "用户电话号码长度不能超过11" })
    @MinLength(11, { message: "用户电话号码长度不能短于11" })
    @Type(() => String)
    public phone!: number;

    public static tranform(plainObj: object): User {
        return super.baseTranform(User, plainObj)
    }



}