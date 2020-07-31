
import { combineReducers } from 'redux'
import { movieReducer, IMovieState } from './movieReducer'
import { movieTypeReducer, IMovieTypeState } from './movieTypeReducer'
import { movieAreaReducer, IMovieAreaState } from './movieAreaReducer'
import { IUserState, userReducer } from './userReducer'
import { adminReducer, IAdminState } from './adminReducer'

export interface IRootState {
    movie: IMovieState,
    type: IMovieTypeState,
    area: IMovieAreaState,
    user: IUserState,
    admin: IAdminState
}
export const reducers = combineReducers({
    movie: movieReducer,
    type: movieTypeReducer,
    area: movieAreaReducer,
    user: userReducer,
    admin: adminReducer
})