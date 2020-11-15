import React from 'react'
import './style.css'
// import car from '../../assets/images/car.jpg'
import other from '../../assets/images/olx_logo.png'
import geoLocation from '../../assets/images/geoLocation.png'
import { checkAuth, get_userInfo, startChat } from '../../store/action'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Product extends React.Component {
    // constructor() {
    //     super()
    // }
    componentDidMount() {
        this.props.get_userInfo(this.props.userId)
        this.props.checkAuth()
    }
    // getSelectedPost = () => {
    //     let selectedPost;
    //     if (posts) {
    //         posts.map((val) => {
    //             if (val.postId === postId) {
    //                 console.log('POST ID', val.postId)
    //                 selectedPost = val
    //             }
    //         })
    //         return selectedPost

    //     }
    //     else {

    //     }
    // }
    render() {
        const { isLogedIn, productId, userId } = this.props
        let getPost = productId ? productId : this.props.history.push('/olx-')

        // this.getSelectedPost(categories,productId)
        // this.getSelectedPost(categories, productId.postId)
        console.log(getPost)

        return (
            <>
                {isLogedIn ?
                    <div className="container">
                        <div className="firstSide">
                            <div className="imageSlider">
                                {/* <p className='featured'>Featured</p> */}
                                <div className="selectedImage">
                                    <img src={getPost.adsImages[0]} alt="product" width='auto' height="420px" />
                                </div>
                                <ul>
                                    {getPost.adsImages.map((val, key) => {
                                        if (getPost.adsImages[0] !== val) {
                                            return (
                                                <li id={key} key={key}>
                                                    <img src={val} alt="product" width="100%" />
                                                </li>
                                            )
                                        }
                                        return console.log()
                                    })}
                                </ul>
                            </div>
                            <div className="productDetail">
                                <div className="details">
                                    <h3>Details</h3>
                                    <ul>
                                        <li>
                                            <span>Make</span><span>KIA</span>
                                        </li>
                                        <li>
                                            <span>Model</span><span>Other</span>
                                        </li>
                                        <li>
                                            <span>Year</span><span>2019</span>
                                        </li>
                                        <li>
                                            <span>Registered</span><span>No</span>
                                        </li>
                                        <li>
                                            <span>Condition</span><span>New</span>
                                        </li>
                                    </ul>
                                </div>
                                <hr />
                                <div className="description">
                                    <h3>Description</h3>
                                    <p>{getPost.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="secondSide">
                            <div className="productOverview">
                                <h3 className="fav"><i className="far fa-heart"></i></h3>
                                <h3 className="share"><i className="fas fa-share-alt"></i></h3>
                                <h4>{'Rs. ' + getPost.price} </h4>
                                <p>{getPost.title}</p>
                                <div>
                                    <small>{getPost.province}</small>
                                    <small>{'Oct 01'}</small>
                                </div>
                            </div>
                            <div className="sellerDescription">
                                <h4>Seller Description</h4>
                                <ul className="user">
                                    <li className="userImageRound"><img src={other} alt="Pic" width="35px" height="35px" /></li>
                                    <li className="userDetail">
                                        <ul>
                                            <li><h4>{getPost.postUserName}</h4></li>
                                            {/* <li><small>Member since Jul 2020</small></li> */}
                                        </ul>
                                    </li>
                                    <li className="forMore"><i className="fas fa-angle-right"></i></li>
                                </ul>
                                {productId.postOwner !== userId &&
                                    <button className="chatWithSeller" onClick={() => this.props.startChat(this.props)}>Chat wit Seller</button>
                                }
                                {productId.postOwner !== userId &&
                                    <p><i className=" fas fa-phone-alt"></i> <small>** *** ****</small> <small>show number</small></p>
                                }
                            </div>
                            <div className="postedIn">
                                <h4>Posted in</h4>
                                <small>{getPost.province.toUpperCase()}</small>
                                <img src={geoLocation} alt="Map" height="150px" />
                            </div>
                        </div>
                    </div> :
                    console.log('not login')
                    // this.props.history.push('/login')

                }
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    isLogedIn: state.root.isLogedIn,
    productId: state.root.productId,
    categories: state.root.categories,
    userId: state.root.uid,
})
const mapDispatchToProp = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth()),
    get_userInfo: (uid) => dispatch(get_userInfo(uid)),
    startChat: (props) => dispatch(startChat(props))
})
export default connect(mapStateToProps, mapDispatchToProp)(Product)