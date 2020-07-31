import { IMovieType } from "../../services/MovieTypeService";

export interface setMovieTypeAction {
    type: "set_movie_type",
    payload: {
        total: number,
        data: IMovieType[]
    }
}
export function setMovieTypeAction(total: number, data: IMovieType[]): setMovieTypeAction {
    return {
        type: "set_movie_type",
        payload: {
            total,
            data
        }
    }
}

export interface deleteMovieTypeAction {
    type: "delete_movie_type",
    payload: string
}

export function deleteMovieTypeAction(id: string): deleteMovieTypeAction {
    return {
        type: "delete_movie_type",
        payload: id
    }
}

export interface fetchMovieTypeAction {
    type: "fetch_movie_type",

}

export function fetchMovieTypeAction(): fetchMovieTypeAction {
    return {
        type: "fetch_movie_type",

    }
}

export interface editMovieTypeAction {
    type: "edit_movie_type",
    payload: {
        types: string,

        _id: string
    }

}

export function editMovieTypeAction(id: string, types: string): editMovieTypeAction {
    return {
        type: "edit_movie_type",
        payload: {
            types,
            _id: id
        }
    }
}

export interface changeMovieTypeAction {
    type: "change_movie_type",
    payload: {
        isShow: boolean,
        _id: string
    }

}

export function changeMovieTypeAction(id: string, isShow: boolean): changeMovieTypeAction {
    return {
        type: "change_movie_type",
        payload: {
            isShow,
            _id: id
        }
    }
}

export type movieTypeActions = setMovieTypeAction | deleteMovieTypeAction | fetchMovieTypeAction | changeMovieTypeAction | editMovieTypeAction