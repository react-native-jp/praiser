import { applyMiddleware, createStore as create } from 'redux';
import thunk from 'redux-thunk';

import appReducer, { createInitialState } from './modules';

export function createStore() {
  return create(appReducer, createInitialState(), applyMiddleware(thunk));
}

export default createStore();
