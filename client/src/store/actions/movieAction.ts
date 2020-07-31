
import { ISearchCondition } from '../reducers/movieReducer'
import { IMovie } from '../../services/MovieService'
import { SwitchType } from '../../services/CommonTypes'

export interface setMovieAction {
    type: "set_movie",
    payload: {
        total: number,
        data: IMovie[]
    }
}
export function setMovieAction(movies: any, total: number): setMovieAction {
    return {
        type: "set_movie",
        payload: {
            total: total,
            data: movies
        }
    }
}
export interface setLoadingAction {
    type: "set_loading",
    payload: boolean
}

export function setLoadingAction(isLoading: boolean): setLoadingAction {
    return {
        type: "set_loading",
        payload: isLoading

    }
}

export interface setConditionAction {
    type: "set_condition",
    payload: ISearchCondition
}

export function setConditionAction(condition: ISearchCondition): setConditionAction {
    return {
        type: "set_condition",
        payload: condition
    }
}
export interface deleteMovieAction {
    type: "delete_movie",
    payload: string
}
export function deleteMovieAction(id: string): deleteMovieAction {
    return {
        type: "delete_movie",
        payload: id
    }
}
export interface fetchMovieAction {
    type: "fetch_movie",

}
export function fetchMovieAction(): fetchMovieAction {
    return {
        type: "fetch_movie",


    }
}
export interface asyncDeleteMovieAction {
    type: "async_delete_movie",
    payload: string

}
export function asyncDeleteMovieAction(id: string): asyncDeleteMovieAction {
    return {
        type: "async_delete_movie",
        payload: id

    }
}
//switch 按钮事件改变仓库
export interface changeSwitchAction {
    type: "movie_switch"
    payload: {
        type: SwitchType,
        newVal: boolean,
        id: string
    }


}
export function changeSwitchAction(type: SwitchType, newVal: boolean, id: string): changeSwitchAction {
    // console.log(type, newVal, id)
    return {
        type: "movie_switch",
        payload: {
            type,
            newVal,
            id
        }

    }
}

//switch 按钮事件改变数据库
export interface asyncEditMovieAction {
    type: "async_edit_movie"
}

export function asyncEditMovieAction(type: SwitchType, newVal: boolean, id: string): asyncEditMovieAction {
    // console.log(type, newVal, id)
    return {
        type: "async_edit_movie",
    }
}
export type movieActions = setConditionAction | deleteMovieAction | setMovieAction | setLoadingAction | fetchMovieAction | asyncDeleteMovieAction | changeSwitchAction | asyncEditMovieAction