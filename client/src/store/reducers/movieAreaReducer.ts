
import { Reducer } from "react";
import { IMovieArea } from "../../services/MovieAreaService";
import { deleteMovieAreaAction, setMovieAreaAction, movieAreaActions, editMovieAreaAction, changeMovieAreaAction } from "../actions/movieAreaAction";

export interface IMovieAreaState {
    data: IMovieArea[],
    total: number,

}
const defaultState: IMovieAreaState = {
    data: [],
    total: 0,

}

const setMovieArea: Reducer<IMovieAreaState, setMovieAreaAction> = (state, action): IMovieAreaState => {
    return {
        ...state,
        ...action.payload
    }
}
const deleteMovieArea: Reducer<IMovieAreaState, deleteMovieAreaAction> = (state, action): IMovieAreaState => {
    const newState = state.data.filter(i => i._id !== action.payload)
    return {
        ...state,
        data: newState,
        total: state.total - 1
    }

}
const changeMovieArea: Reducer<IMovieAreaState, changeMovieAreaAction> = (state, action): IMovieAreaState => {
    const area = state.data.find(i => i._id === action.payload._id)
    if (!area) {
        return state
    }
    let _area: any = { ...area }
    _area.isShow = action.payload.isShow

    // console.log(_area)
    const newDatas = state.data.map(a => {
        if (a._id === action.payload._id) {

            return _area
        } else {
            return a
        }
    })
    // console.log(newDatas)
    return {
        total: state.total,
        data: newDatas

    }

}
const editMovieArea: Reducer<IMovieAreaState, editMovieAreaAction> = (state, action): IMovieAreaState => {
    const area = state.data.find(i => i._id === action.payload._id)
    if (!area) {
        return state
    }
    const _area: any = { ...area }
    _area.area = action.payload.area;
    const newDatas = state.data.map(a => {
        if (a._id === action.payload._id) {

            return _area
        } else {
            return a
        }
    })
    // console.log(newDatas)
    return {
        total: state.total,
        data: newDatas

    }

}

export function movieAreaReducer(state: IMovieAreaState = defaultState, action: movieAreaActions) {
    switch (action.type) {
        case "set_movie_area":
            return setMovieArea(state, action);
        case "delete_movie_area":
            return deleteMovieArea(state, action);
        case "edit_movie_area":
            return editMovieArea(state, action);
        case "change_movie_area":
            return changeMovieArea(state, action);
        default:
            return state

    }

}