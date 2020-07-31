import 'reflect-metadata'
import Express from 'express'
import MovieRouter from './routes/MovieRoute'
import TypeRouter from './routes/TypeRoute'
import AreaRouter from './routes/AreaRoute'
import UserRouter from './routes/UserRoute'
import UploadRouter from './routes/UploadRoute'
import history from 'connect-history-api-fallback'



const app = Express();
app.use(history())

// 配置中间件，解析请求体中的json格式
app.use(Express.json())
app.use("/", Express.static("public/build"))
app.use("/upload", Express.static("public/upload"))


app.use("/api/movie", MovieRouter)
app.use("/api/type", TypeRouter)
app.use("/api/area", AreaRouter)
app.use("/api/user", UserRouter)

// 文件上传地址
app.use("/api/upload", UploadRouter)

/* const m: any = {
    name: "qqqq25555",
    password: "dfsddd"
}
UserService.findUser().then(res => console.log(res))
 */

app.listen(3000)