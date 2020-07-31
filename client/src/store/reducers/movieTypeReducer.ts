import { IMovieType } from "../../services/MovieTypeService";
import { movieTypeActions, setMovieTypeAction, deleteMovieTypeAction, changeMovieTypeAction, editMovieTypeAction } from "../actions/movieTypeAction";
import { Reducer } from "react";

export interface IMovieTypeState {
    data: IMovieType[],
    total: number,
}
const defaultState: IMovieTypeState = {
    data: [],
    total: 0,
}

const setMovieType: Reducer<IMovieTypeState, setMovieTypeAction> = (state, action): IMovieTypeState => {
    return {
        ...state,
        ...action.payload
    }
}
const deleteMovieType: Reducer<IMovieTypeState, deleteMovieTypeAction> = (state, action): IMovieTypeState => {
    const newState = state.data.filter(i => i._id !== action.payload)
    return {
        data: newState,
        total: state.total - 1
    }

}

const changeMovieType: Reducer<IMovieTypeState, changeMovieTypeAction> = (state, action): IMovieTypeState => {
    const types = state.data.find(i => i._id === action.payload._id)
    if (!types) {
        return state
    }
    let _types: any = { ...types }
    _types.isShow = action.payload.isShow

    // console.log(_types)
    const newDatas = state.data.map(a => {
        if (a._id === action.payload._id) {

            return _types
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
const editMovieType: Reducer<IMovieTypeState, editMovieTypeAction> = (state, action): IMovieTypeState => {
    const types = state.data.find(i => i._id === action.payload._id)
    if (!types) {
        return state
    }
    const _types: any = { ...types }
    _types.types = action.payload.types;
    const newDatas = state.data.map(a => {
        if (a._id === action.payload._id) {

            return _types
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


export function movieTypeReducer(state: IMovieTypeState = defaultState, action: movieTypeActions) {
    switch (action.type) {
        case "set_movie_type":
            return setMovieType(state, action);
        case "delete_movie_type":
            return deleteMovieType(state, action);
        case "change_movie_type":
            return changeMovieType(state, action);
        case "edit_movie_type":
            return editMovieType(state, action)
        default:
            return state

    }

}