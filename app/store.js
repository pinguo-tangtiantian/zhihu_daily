import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers/index';

/**
 * 创建store，接入reducers
 */
export default function myCreateStores(){
    const thunkMiddleWare = applyMiddleware(thunk);
    const store = createStore(
        combineReducers({...reducers}),
        thunkMiddleWare
    );
    return store;
}