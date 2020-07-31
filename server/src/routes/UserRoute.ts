import Express from "express"
import UserService from "../services/UserService"
import { ResponseHelper } from "./ResponseHelper"

const router = Express.Router()

// 分页获取全部用户信息
router.get("/", async (req, res) => {
    const result = await UserService.searchUser(req.query)
    ResponseHelper.sendPageData(result, res)

})
// 获取单个用户信息
router.get("/:id", async (req, res) => {
    const result = await UserService.findUserById(req.params.id)
    ResponseHelper.sendData(result, res)

})
// 添加用户信息
router.post("/add", async (req, res) => {
    const result = await UserService.addUser(req.body)
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }
})
// 修改用户信息
router.put("/:id", async (req, res) => {
    const result = await UserService.updateUser(req.params.id, req.body)
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }
})

// 删除用户

router.delete("/:id", async (req, res) => {
    const result = await UserService.deleteUser(req.params.id)

    ResponseHelper.sendData(true, res)

})

export default router