// import firebase from '../../assets/config/create_post'
const INITIAL_STATE = {
    // name: "Abdul Rafay",
    loader: true

}
// console.log(firebase.auth().currentUser)
const reducer = (state = INITIAL_STATE, action) => {
    // console.log('==>', action)
    switch (action.type) {
        case 'create_account':
            return ({
                ...state,
                data: action.user,
                uid: action.user.userId
            })
        case 'sign_in':
            return ({
                ...state,
                data: action.data,
                uid: action.user.userId
            })
        case 'sign_out':
            return ({
                ...state,
                isLogedIn: action.payload

            })
        case 'check_auth':
            return ({
                ...state,
                isLogedIn: action.isLogedIn,
                uid: action.uid,
                loader: true
                // userInfo: action.userData
            })
        case 'get_user_info':
            return ({
                ...state,
                userInfo: action.payload

            })
        case 'create_post':
            return ({
                ...state,
                loader: action.payload

            })
        case 'get_post':
            return ({
                ...state,
                categories: action.payload

            })
        case 'product_data':
            return ({
                ...state,
                productId: action.payload
            })
        case 'chat_data':
            return ({
                ...state,
                chatData: action.payload
            })
        default:
            return({
                ...state
            })



    }
    // return state

} 

export default reducer