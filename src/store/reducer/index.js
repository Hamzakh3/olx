import reducer from './reducer'
import {combineReducers} from 'redux'

export default combineReducers({
    root:reducer
})



// const INITIAL_STATE = {
//     name:"Abdul Rafay"
// } 

// export default (state =  INITIAL_STATE, action) => {
//     console.log('==>', action)
//     switch(action.type){
//         case 'SET_DATA':
//         return ({
//             ...state,
//             data:action.data
//         })
//         case 'GET_DATA':
//         return ({
//             ...state,
//             data:action.data
//         })
//     }
//     return state
    
// } 