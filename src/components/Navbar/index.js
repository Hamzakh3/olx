import React from 'react'
import './style.css'
import SecondNavbar from '../SecondNavbar'
import Logo from '../../assets/images/olx_logo.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import firebase from '../../assets/config/firebase'
import { checkAuth, get_userInfo, sign_out } from '../../store/action'

class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            clicked: false,
            txtSearch: '',
            selectLocation: '',
            dropUser: false,
            notify: false

        }
    }
    handleMenu = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }
    handleChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    gotoSetting= ()=>{
        this.props.history.push('/olx-/setting')
        this.setState({dropUser:false})
    }
    gotoMyAds= ()=>{
        this.props.history.push('/olx-/my-ads')
        this.setState({dropUser:false})
    }
    componentDidMount() {
        this.props.checkAuth()
    }
    render() {

        const { clicked, txtSearch, selectLocation, dropUser, notify } = this.state
        const { isLogedIn, state_ } = this.props
        const authUid = localStorage.getItem('currentUserId')
        // firebase.auth().currentUser?firebase.auth().currentUser.uid:''
        // console.log(this.props.userId)
        // this.props.get_userInfo(this.props.userId)

        return (
            <>
                <div>
                    <nav className="navbar">
                        <span className="logo">
                            <Link to='/olx-'>
                                <img className="olxLogo" src={Logo} alt="olx" width='45px' />
                            </Link>
                        </span>
                        <div className="menuIcon">
                            <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} onClick={this.handleMenu}></i>
                        </div>
                        <ul className={clicked ? 'menuItems active' : 'menuItems'}>
                            <li className="location">
                                <select value='selectLocation' name='selectLocation' onChange={(e) => { this.handleChangeValue(e) }}>
                                    <option value='pakistan'>Pakistan</option>
                                    <option value='sindh'>Sindh</option>
                                    <option value='punjab'>Punjab</option>
                                    <option value='balochistan'>Balochistan</option>
                                    <option value='kpk'>KPK</option>
                                    <option value='gilgitbaldistan'>Gilgit Baldistan</option>
                                </select>
                            </li>
                            <li className="search">
                                <input type="search" name='txtSearch' placeholder="Find Cars, Mobile Phones and more..." onChange={(e) => { this.handleChangeValue(e) }} value={txtSearch} /><button className='fas fa-search'></button>
                            </li>
                            {isLogedIn ?
                                <>
                                    <li className="chatIcon navIcon" onClick={()=>this.props.history.push('/olx-/chat')}>
                                        <i className='fas fa-comment'></i>
                                    </li>
                                    <li className="notificationIcon navIcon">
                                        {/* <Link to='/olx-/setting'> */}
                                            <i className='fas fa-bell' onClick={()=>{this.setState({dropUser:false, notify: !notify})}}></i>
                                            <div className={notify? 'notification notificationCall': 'notification'} >
                                                <ul className='dropUserColumn'>
                                                    <li>No New Notification</li>
                                                </ul>
                                            </div>
                                        {/* </Link> */}
                                    </li>
                                    <li className="userIcon navIcon">
                                        {/* <Link to='/olx-/setting'> */}
                                        <span onClick={() => { this.setState({ dropUser: !dropUser, notify: false }) }}>
                                            <i className='fas fa-user'></i>
                                            <i className='fas fa-angle-down'></i>
                                        </span>
                                        <div className={dropUser ? 'dropUser dropUserCall' : 'dropUser'}>
                                            <ul className='dropUserColumn'>
                                                <li onClick={()=>this.gotoMyAds()}><i className='far fa-newspaper'></i>My Ads</li>
                                                <hr />
                                                <li onClick={()=>this.gotoSetting()}><i className='fas fa-sliders-h'></i> Setting</li>
                                                <hr />
                                                <li onClick={()=>this.props.sign_out(this.props.history)}> <i className='fas fa-sign-out-alt'></i>Logout</li>
                                            </ul>
                                        </div>

                                        {/* </Link> */}
                                    </li>
                                </> : <>
                                    < li className="login" >
                                        <Link to='/login'>Login</Link>
                                    </li >
                                </>}

                            <li className="sell">
                                <Link to='/olx-/post'>
                                    <button><i className="fas fa-plus"></i> Sell</button>
                                </Link>
                            </li>

                        </ul>
                    </nav>
                    <SecondNavbar />
                </div>
            </>



        )
    }
}
const mapStateToProps = (state) => ({
    isLogedIn: state.root.isLogedIn,
    userId: state.root.uid

})
const mapDispatchToProp = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth()),
    sign_out: (history) => dispatch(sign_out(history))
    // get_userInfo: (userId)=> dispatch(get_userInfo(userId))
})

export default connect(mapStateToProps, mapDispatchToProp)(Navbar)



                            // < li className = "login" >
                            //      <Link to='/login'>Login</Link>
                            // </li >
                            // <li className="login">
                            //     <Link to='olx-/chat'>Chat</Link>
                            // </li>
                            // <li className="login">
                            //     <Link to='olx-/setting'>Setting</Link>
                            // </li>