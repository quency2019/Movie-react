import { IMovieArea } from "../../services/MovieAreaService";

export interface setMovieAreaAction {
    type: "set_movie_area",
    payload: {
        total: number,
        data: IMovieArea[]
    }
}
export function setMovieAreaAction(total: number, data: IMovieArea[]): setMovieAreaAction {
    return {
        type: "set_movie_area",
        payload: {
            total,
            data
        }
    }
}

export interface deleteMovieAreaAction {
    type: "delete_movie_area",
    payload: string
}

export function deleteMovieAreaAction(id: string): deleteMovieAreaAction {
    return {
        type: "delete_movie_area",
        payload: id
    }
}
export interface fetchMovieAreaAction {
    type: "fetch_movie_area",

}

export function fetchMovieAreaAction(): fetchMovieAreaAction {
    return {
        type: "fetch_movie_area",

    }
}
export interface editMovieAreaAction {
    type: "edit_movie_area",
    payload: {
        area: string,

        _id: string
    }

}

export function editMovieAreaAction(id: string, area: string): editMovieAreaAction {
    return {
        type: "edit_movie_area",
        payload: {
            area,
            _id: id
        }
    }
}

export interface changeMovieAreaAction {
    type: "change_movie_area",
    payload: {
        isShow: boolean,
        _id: string
    }

}

export function changeMovieAreaAction(id: string, isShow: boolean): changeMovieAreaAction {
    return {
        type: "change_movie_area",
        payload: {
            isShow,
            _id: id
        }
    }
}
export type movieAreaActions = setMovieAreaAction | deleteMovieAreaAction | fetchMovieAreaAction | editMovieAreaAction | changeMovieAreaAction