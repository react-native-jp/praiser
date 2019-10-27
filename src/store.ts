import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import appReducer, { createInitialState } from './modules'

export default createStore(appReducer, createInitialState(), applyMiddleware(thunk))
