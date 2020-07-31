import Express from 'express'
import { ResponseHelper } from './ResponseHelper'
import { TypeService } from '../services/TypeService'
const router = Express.Router()


router.get("/", async (req, res) => {
    const result = await TypeService.findType();
    ResponseHelper.sendPageData(result, res)

})
router.post("/add", async (req, res) => {
    const result = await TypeService.addTypes(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }

})
router.put("/:id", async (req, res) => {
    try {
        const result = await TypeService.updataTypes(req.params.id, req.body)
        if (result.length > 0) {
            ResponseHelper.sendError(result, res)
        } else {
            ResponseHelper.sendData(true, res)
        }
    } catch (error) {
        ResponseHelper.sendError("id错误", res)
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const result = await TypeService.deleteTypes(req.params.id)
        ResponseHelper.sendData(true, res)

    } catch (error) {
        ResponseHelper.sendError("id错误", res)
    }
})


export default router