import Mongoose from "mongoose"
import MovieModel from "./MovieSchema"
import TypesModel from "./TypeSchema"
import AreasModel from "./AreaSchema"
import UserModel from "./UserSchema"
const DB_URL = 'mongodb://localhost:27017/moviedb';
Mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("连接数据库成功")).catch((error) => {
    console.log(error)
})

export { MovieModel, TypesModel, AreasModel, UserModel }