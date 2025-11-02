import reducerSum from "./SumReducer";
import {combineReducers} from "redux"

const reducer=combineReducers({
    sum: reducerSum,
    
})

export default reducer