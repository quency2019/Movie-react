import Mongoose from "mongoose"
import { User } from "../entities/user";

export interface IUser extends User, Mongoose.Document { }
const userSchema = new Mongoose.Schema<IUser>({
    username: String,
    password: String,
    name: String,
    phone: Number


}, {
    versionKey: false
})

export default Mongoose.model<IUser>("User", userSchema)
