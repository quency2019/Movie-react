import { createStore, applyMiddleware } from "redux"
import { reducers } from "./reducers/reducers"
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { mySaga } from "./saga"
const sagaMiddleWare = createSagaMiddleware()
export const store = createStore(reducers, applyMiddleware(sagaMiddleWare, logger))

sagaMiddleWare.run(mySaga)