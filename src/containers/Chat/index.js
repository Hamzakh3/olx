import React from 'react'
import './style.css'
import product from '../../assets/images/car.jpg'
import photo from '../../assets/images/add_a_photo-24px.svg'
import chatIcon from '../../assets/images/chatIcon.png'
import { connect } from 'react-redux'
import { getChatList } from '../../store/action'
import { Link } from 'react-router-dom'


// import { connect } from 'react-redux'
// import {  } from '../../store/action'

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            messageText: '',
            ifNoChat: true,
            // uInfo : !this.props.userInfo ? false : true
        }
    }
    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // getProductChatList = () => {
    //     let { userInfo } = this.props
    //     let userChatList = []
    //     // console.log(userInfo)
    //     if (userInfo !== null) {
    //         Object.keys(userInfo.chatsWith).map((v, k) => {
    //             // console.log('====')
    //             Object.keys(userInfo.chatsWith.[v]).map((val, key) => {
    //                 userChatList.push(val)
    //             })
    //         })
    //         return userChatList
    //         // console.log(userChatList)
    //     }
    //     else {
    //         console.log(userInfo)
    //         return(userChatList)
    //     }
    // }
    // componentDidMount() {

    // }
    render() {
        console.log(this.props.state_)
        let { ifNoChat, uInfo} = this.state
        let { userInfo, history, state_, categories } = this.props
        // const cList = this.getProductChatList()
        // console.log(cList)
        return (
            <div className='chat'>
                {userInfo !== undefined ?
                    <div className='chatContainer'>
                        <div className='inboxArea'>
                            <div className='cHeader'>
                                <h2>INBOX</h2>
                            </div>
                            {/* {window.screen.width < 1100 */}
                            <ul className="chats">
                                {/* {categories && cList ?
                                    cList.map((v) => {
                                        categories.map((val) => {
                                            if (v === val.postId) {
                                                // console.log(val)
                                                return (
                                                    
                                                )
                                            }
                                        })
                                    }) :
                                    console.log(categories, cList)

                                } */}
                                <li onClick={()=>this.setState({ifNoChat:false})}>
                                    <span className='productUserImage'>
                                        <img src={product} className='productImageWithUser' alt="" width='35px' height='35px' />
                                        <img src={photo} className='userImageWithProduct' alt="" width='17px' height='17px' />
                                    </span>
                                    <span className='productUserInfo'>
                                        {window.screen.width < 1100 ?
                                        <small className='userName'>Ahsam Camer.</small>:
                                        <small className='userName'>Ahsam Camera Center</small>}
                                        {window.screen.width < 1100 ?
                                        <small className='productTitle'></small>:
                                        '' }
                                    </span>
    
                                </li>
                            </ul>
                            {/* } */}
                        </div>
                        <div className={ifNoChat ? 'chatArea ifNoChatArea' : 'chatArea'}>
                            {ifNoChat ?
                                <div className='ifNoChat'>
                                    <img src={chatIcon} alt="Chat Icon" width='150px' height='150px' />
                                    <p>Select a chat to view conversation</p>
                                </div> :
                                <>
                                    <div className='cHeader'>
                                        <span className='productUserImage'>
                                            <img src={product} className='productImageWithUser' alt="" width='45px' height='45px' />
                                            <img src={photo} className='userImageWithProduct userProdIcon' alt="" width='20px' height='20px' />
                                        </span>
                                        <h3>Ahsam Camera Center</h3>
                                        <h3 className='closeIcon' onClick={() => this.setState({ ifNoChat: true })}><i className='fas fa-times'></i></h3>
                                    </div>
                                    <div className='chatingArea'>
                                        <div className='prodInfoPrice'>
                                            <p>Iphone 11 pro max 256gb back glas..</p> <p>Rs. 148,000</p>
                                        </div>
                                        <div className='messages'>
                                            <ul>
                                                <li className='meChat'>
                                                    <span className='mesgTxt'>
                                                        Hello I want to know how quantites you have?</span>
                                                    <small>
                                                        1:00 PM
                                                </small>
                                                </li>
                                                <li className='userChat'>
                                                    <span className='mesgTxt'>
                                                        Hi, How much you want
                                                </span>
                                                    <small>
                                                        1:00 PM
                                                </small>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='sendingArea'>
                                            <i className="fas fa-paperclip attach"></i>
                                            <input type="text" placeholder='type message here' name='messageText' onChange={(e) => this.handleValueChange(e)} value={this.state.messageText} />
                                            <button><i className='fas fa-paper-plane'></i></button>
                                        </div>
                                    </div>
                                </>

                            }
                        </div>
                    </div>
                    : history.push('/olx-')}
            </div>
        )



    }

}
const mapStateToProps = (state) => ({
    chatData: state.root.chatData,
    userInfo: state.root.userInfo,
    userId: state.root.uid,
    categories: state.root.categories,
    state_: state.root
})
const mapDispatchToProp = (dispatch) => ({
    getChatList: (props) => dispatch(getChatList(props)),
    // get_userInfo: (uid) => dispatch(get_userInfo(uid))
})
export default connect(mapStateToProps, mapDispatchToProp)(Chat)