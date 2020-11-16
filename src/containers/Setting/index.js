import React from 'react'
import { connect } from 'react-redux'
import { checkAuth, get_userInfo, updateUserName, changeUserPass } from '../../store/action'
import './Style.css'
// import { useHistory } from 'react-router-dom'



class MyAds extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPass: '',
            newPass: '',
            editMode: false,
            changeUName: ''
        }
    }
    componentDidMount() {
        this.props.get_userInfo(this.props.userId)
    }
    handleChangeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log(this.props.state_)
        const { currentPass, newPass, editMode, changeUName } = this.state
        const { userInfo, userId } = this.props
        const ifValid = () => {
            return currentPass === '' || newPass === '' ||
                newPass.length < 6
        }
        const ifValidName = () => {
            return changeUName === '' || changeUName.length < 3
        }

        return (

            <div className='myads'>
                {userInfo && userInfo !== null ?
                <div>
                    <h3>Setting</h3>

                    <div className='settingUserProfile'>
                        <div className='userNameImage'>{userInfo ? userInfo.txtUserName.slice(0, 2) : ''}</div>
                        {!editMode ?
                            <p>{userInfo ? userInfo.txtUserName : ''}<div>Member Since Oct, 2020</div></p> :
                            <div className='editMode'>
                                <input type='text' name='changeUName' onChange={(e) => this.handleChangeValue(e)} value={changeUName} placeholder={userInfo.txtUserName} />
                                <small>If you want to change your Username.</small>
                            </div>}
                        {editMode ?
                            <>
                                <button className='btnCancel' onClick={() => this.setState({ editMode: false, changeUName: '' })}>Cancel</button>
                                <button disabled={ifValidName()} className={!ifValidName() ? '' : 'changeNameBtnDisbale'} onClick={() => {this.props.updateUserName(userId, changeUName);this.setState({editMode:false})}}>Save</button>
                            </> :
                            <button className='btnEdit' onClick={() => this.setState({ editMode: !editMode })}>Edit Profile</button>

                        }

                    </div>
                    <div className='settingUserPass'>
                        <div>
                            <label htmlFor="currentPass">Current Password</label>
                            <input type="password" name='currentPass' onChange={(e) => this.handleChangeValue(e)} value={this.state.currentPass} />
                        </div>
                        <div>
                            <label htmlFor="newPass">New Password</label>
                            <input type="password" name='newPass' onChange={(e) => this.handleChangeValue(e)} value={this.state.newPass} />
                            <small>Use minimum 6 characters</small>
                        </div>
                        <div>
                            <button disabled={ifValid()} className={!ifValid() ? '' : 'changePassBtnDisable'} onClick={() => {this.props.changeUserPass(currentPass, newPass); this.setState({currentPass:'', newPass:''})}}>Change</button>
                        </div>
                    </div>




                </div>
                : this.props.get_userInfo(this.props.userId) }

            </div>

        )

    }

}

const mapStateToProps = (state) => ({
    userId: state.root.uid,
    isLogedIn: state.root.isLogedIn,
    userInfo: state.root.userInfo,
    state_: state.root
})
const mapDispatchToProp = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth()),
    get_userInfo: (uid) => dispatch(get_userInfo(uid)),
    updateUserName: (uid, newName) => dispatch(updateUserName(uid, newName)),
    changeUserPass: (cPass, nPass) => {dispatch(changeUserPass(cPass, nPass))}

})
export default connect(mapStateToProps, mapDispatchToProp)(MyAds)

// {

// }