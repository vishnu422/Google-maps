import reducer from './mapReducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    mapReducer: reducer
})

export default rootReducer