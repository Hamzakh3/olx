import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Home from '../../containers/Home'
import Login from '../../containers/Login'
import Post from '../../containers/Post'
import SignUp from '../../containers/SignUp'
import Chat from '../../containers/Chat'
import Product from '../../containers/Product'
import Setting from '../../containers/Setting'
import MyAds from '../../containers/MyAds'


// import { connect } from 'react-redux'
// import checkAuth from '../../store/action'

class AppRouter extends React.Component {
    render() {
        // this.props.checkAuth()
        // const {isLogedIn} = this.props
        return (
            <Router>
                <Route path='/olx-' component={Navbar} />
                <Route exact path='/olx-' component={Home}/>
                <Route exact path='/' component={Navbar}/>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/create-account' component={SignUp}/>
                <Route exact path='/olx-/post' component={Post}/>
                <Route exact path='/olx-/chat' component={Chat}/>
                <Route exact path='/olx-/product' component={Product}/>
                <Route exact path='/olx-/setting' component={Setting}/>
                <Route exact path='/olx-/my-ads' component={MyAds}/>



            </Router>    
        )
    }
}
// const mapStateToProps = (state)=>({
//     isLogedIn: state.root.isLogedIn,
// })
// const mapDispatchToProp = (dispatch)=>({
//     checkAuth: () => dispatch(checkAuth()),
// })
export default AppRouter

// connect(mapStateToProps, mapDispatchToProp)