import { ClassType } from "class-transformer/ClassTransformer"
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"

export abstract class BaseFunc {
    protected static baseTranform<T>(cls: ClassType<T>, plainObj: object): T {
        if (plainObj instanceof cls) {
            return plainObj
        }
        return plainToClass(cls, plainObj)
    }

    public async validataThis(skipMissing: boolean = false): Promise<string[]> {

        const errors = await validate(this, {
            skipMissingProperties: skipMissing
        })
        const errs = errors.map(e => Object.values(e.constraints))
        const res: string[] = []
        errs.forEach(e => {
            res.push(...e)
        })
        return res
    }

}