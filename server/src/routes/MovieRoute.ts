import Express from 'express'
import { MovieService } from '../services/MovieService'
import { ResponseHelper } from './ResponseHelper'
const router = Express.Router()

router.get("/:id", async (req, res) => {
    try {
        const movieId = req.params.id
        const movie = await MovieService.findById(movieId)
        ResponseHelper.sendData(movie, res)

    } catch (error) {
        ResponseHelper.sendData(null, res)
    }

})

router.get("/", async (req, res) => {
    const result = await MovieService.findByCondition(req.query);
    ResponseHelper.sendPageData(result, res)

})

router.post("/", async (req, res) => {
    const result = await MovieService.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }

})

router.put("/:id", async (req, res) => {
    try {
        const result = await MovieService.updata(req.params.id, req.body)
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
        const result = await MovieService.delete(req.params.id)

        ResponseHelper.sendData(true, res)

    } catch (error) {
        ResponseHelper.sendError("id错误", res)
    }
})



export default router