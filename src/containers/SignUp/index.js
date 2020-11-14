import React from 'react'
import Logo from '../../assets/images/olx_logo.png'
import './style.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkAuth, create_account } from '../../store/action'

class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            txtEmail: '',
            txtPass: '',
            txtUserName: '',
            txtNumber: ''
        }
    }
    handleValueChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
        // console.log(e.target.value)
    }
    handleValueDefault = () => {
        this.setState({
            txtEmail: '',
            txtPass: '',
            txtUserName: '',
            txtNumber: ''
        })
    }
    render() {
        let { txtEmail, txtPass, txtNumber, txtUserName } = this.state
        const { isLogedIn } = this.props
        this.props.checkAuth()
        const signUpUser = {
            txtEmail,
            txtPass,
            txtNumber,
            txtUserName
        }

        const invalid = txtEmail === '' || txtPass.length < 6 || txtNumber.length < 11 || txtNumber.length !== 11 || txtUserName === ''
        console.log(this.props.history)
        return (
            <>
                {isLogedIn ?
                    this.props.history.replace('/olx-'):
                    <div className="loginContainer">
                        <div className="loginForm">
                            <div className="header">
                                <img src={Logo} alt="olx" width='95px' />
                                <h1 className="loginHeading">Create Account</h1>
                            </div>
                            <div className="forError">
                                <span>Error</span>
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="txtUserName">User Name</label>
                                <input type="text" onChange={(e) => { this.handleValueChange(e, 'txtUserName') }} placeholder="User Name" value={txtUserName} />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="txtEmail">Email</label>
                                <input type="email" onChange={(e) => { this.handleValueChange(e, 'txtEmail') }} placeholder="Type your email" value={txtEmail} />
                            </div>
                            <div className="inputGroup">
                                <label htmlFor="txtPass">Password</label>
                                <input type="password" onChange={(e) => { this.handleValueChange(e, 'txtPass') }} placeholder="******" value={txtPass} />
                            </div>

                            <div className="inputGroup">
                                <label htmlFor="txtNumber">Mobile Number</label>
                                <input type="number" onChange={(e) => { this.handleValueChange(e, 'txtNumber') }} placeholder="Type your Mobile Number" value={txtNumber} />
                            </div>
                            <div>
                                <small className="forCreateAccount"><Link to='/login'>If you have already account.</Link></small>

                            </div>
                            <div className="inputGroup">
                                <button disabled={invalid} className={invalid ? "disableBtn" : "btnCreateAccount"} onClick={() => this.props.create_account(signUpUser, this.props.history, signUpUser.txtPass)}>Create Account</button>
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
const mapDsipatchToProp = (dispatch) => ({
    create_account: (data, history, pass) => {
        dispatch(create_account(data, history, pass))
    },
    checkAuth: () => dispatch(checkAuth())
})
export default connect(mapStateToProps, mapDsipatchToProp)(SignUp)