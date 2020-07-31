
import { IMovie } from "../../services/MovieService"
import { movieActions, setMovieAction, setLoadingAction, setConditionAction, deleteMovieAction, changeSwitchAction } from "../actions/movieAction"
import { Reducer } from "react";

export interface ISearchCondition {
    key?: string,
    page?: number,
    limit?: number
}

type IMovieCondition = Required<ISearchCondition>

export interface IMovieState {
    data: IMovie[],
    isLoading: boolean,
    searchConditons: IMovieCondition,
    total: number,
    totalPage: number
}

const defaultState: IMovieState = {
    data: [],
    isLoading: false,
    searchConditons: {
        key: "",
        page: 1,
        limit: 10
    },
    total: 0,
    totalPage: 0
}

const setMovie: Reducer<IMovieState, setMovieAction> = (state, action): IMovieState => {
    const newState = {
        ...state,
        ...action.payload,

    }
    newState.totalPage = Math.ceil(newState.total / newState.searchConditons.limit)
    return newState
}

const setLoading: Reducer<IMovieState, setLoadingAction> = (state, action): IMovieState => {
    return {
        ...state,
        isLoading: action.payload

    }
}
const setCondition: Reducer<IMovieState, setConditionAction> = (state, action): IMovieState => {
    return {
        ...state,
        searchConditons: {
            ...state.searchConditons,
            ...action.payload
        }

    }
}
const deleteMovie: Reducer<IMovieState, deleteMovieAction> = (state, action): IMovieState => {
    return {
        ...state,
        total: state.total - 1,
        data: state.data.filter(m => m._id !== action.payload),
        totalPage: Math.ceil((state.total - 1) / state.searchConditons.limit)


    }
}

const changeSwitch: Reducer<IMovieState, changeSwitchAction> = (state, action): IMovieState => {
    // 根据id查找对象
    const movie = state.data.find(d => d._id === action.payload.id)
    if (!movie) {
        return state
    }
    //对象克隆
    const _movie = { ...movie }
    // console.log(_movie)

    _movie[action.payload.type] = action.payload.newVal
    // console.log(state.data)
    //重新放入数组
    // console.log(action.payload.id)
    const newData = state.data.map(d => {
        if (d._id === action.payload.id) {
            // console.log(d._id)
            // console.log(_movie)
            return _movie
        } else {
            return d
        }
    })
    // console.log(newData)


    return {
        ...state,
        data: newData
    }


}

export function movieReducer(state: IMovieState = defaultState, action: movieActions) {
    switch (action.type) {
        case "set_movie":
            return setMovie(state, action)

        case "set_loading":
            return setLoading(state, action)

        case "set_condition":
            return setCondition(state, action)

        case "delete_movie":
            return deleteMovie(state, action)

        case "movie_switch":
            return changeSwitch(state, action)
        default:
            return state


    }



}