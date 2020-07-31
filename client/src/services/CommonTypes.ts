export interface IResponseError {
    err: string
    data: null
}

export interface IResponseData<T> {
    err: ""
    data: T

}

export interface IResponsePageData<T> {
    err: ""
    data: T[]
    total: string
}

export enum SwitchType {
    isHot = 'isHot',
    isClassic = 'isClassic',
    isComing = 'isComing',
}