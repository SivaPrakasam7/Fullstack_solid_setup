import type { IError, IMiddleWare } from 'src/handler/middleware'
import { sampleService } from 'src/services/sample'

export const sampleController: IMiddleWare = async (req, res, next) => {
    try {
        const data = req.body
        const result = await sampleService(data)

        res.status(200).json({ data: result })
    } catch (e) {
        next(e as IError)
    }
}
