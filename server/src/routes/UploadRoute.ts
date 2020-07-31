import Express from 'express'
import multer from 'multer'
import path from 'path'
import { ResponseHelper } from './ResponseHelper'

const router = Express.Router()

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../public/upload"),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

const allowExtensions = [".jpg", ".png", ".gif", ".bmp", ".svg", ".tif"]
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024// 文件上传尺寸
    },
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname)
        if (allowExtensions.includes(ext)) {
            cb(null, true)
        } else {
            cb(new Error("文件类型不正确"))
        }
    }
}).single('imgname')

router.post("/", (req, res) => {
    upload(req, res, (err) => {
        // 发生错误
        if (err) {
            ResponseHelper.sendError(err.message, res)
            console.log(err)
        }
        // 一切都好
        else {
            const url = `/upload/${req.file.filename}`
            ResponseHelper.sendData(url, res)
        }
    })
})


export default router


