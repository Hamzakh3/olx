import React from 'react'
import { connect } from 'react-redux'
import { checkAuth, sign_in } from '../../store/action'
import Logo from '../../assets/images/olx_logo.png'
import './style.css'
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            txtEmail: '',
            txtPass: ''
        }
    }
    handleValueChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
        // console.log(e.target.value)
    }
    componentDidMount(){
        this.props.checkAuth()
    }
    render() {
        let { txtEmail, txtPass } = this.state
        const { isLogedIn } = this.props
        
        const signInUser = {
            txtEmail,
            txtPass
        }
        // console.log(signInUser)
        console.log(this.props)
        return (
            <>
            {isLogedIn?
            this.props.history.replace('/olx-'):
            <div className="loginContainer">
                <div className="loginForm">
                    <div className="header">
                        <img src={Logo} alt="olx" width='95px' />
                        <h1 className="loginHeading">Login</h1>
                    </div>
                    <div className="forError">
                        <span>Error</span>
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="txtEmail">Email</label>
                        <input type="email" onChange={(e) => { this.handleValueChange(e, 'txtEmail') }} placeholder="Type your email" value={txtEmail} />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="txtPass">Password</label>
                        <input type="password" onChange={(e) => { this.handleValueChange(e, 'txtPass') }} placeholder="******" value={txtPass} />
                    </div>
                    <div>
                        <small className="forCreateAccount"><Link to='/create-account'>Create account, if you have no account?</Link></small>

                    </div>
                    <div className="inputGroup">
                        <button className="btnLogin" onClick={() => this.props.sign_in(signInUser, this.props.history)}>Login</button>
                    </div>
                </div>
            </div>

            }
            </>
        )

    }

}
const mapStateToProps = (state) => ({
    isLogedIn: state.root.isLogedIn
})
const mapDispatchToProp = (dispatch) => ({
    sign_in: (data, history) => dispatch(sign_in(data, history)),
    checkAuth: () => dispatch(checkAuth())
})

export default connect(mapStateToProps, mapDispatchToProp)(Login)