const INITIAL_STATE = {
    name:'HAmza',
}

export default (state = INITIAL_STATE, action)=>{
    console.log(action)
    return state

}



// import reducer from './reducer'
// import {combineReducers} from 'redux'


// export default combineReducers({
//     root:reducer
// })