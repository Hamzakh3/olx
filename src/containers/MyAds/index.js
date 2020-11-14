import React from 'react'
import { connect } from 'react-redux'
import { get_post, checkAuth, getProductKey, removeAd } from '../../store/action'
import './Style.css'
import { Link } from 'react-router-dom'
import Car from '../../assets/images/car.jpg'



class MyAds extends React.Component {
    constructor() {
        super()
        this.state = {
            // list: 
        }
    }
    componentDidMount() {
        this.props.get_post()
        this.props.checkAuth()
    }
    getMyAdsList() {
        let { categories, userId} = this.props

        let adsList = []
        if (this.props.categories) {
            categories.map((data) => {
                if (data.postOwner === userId) {
                    // console.log(data)
                    adsList.push(data)
                }
                //         <h2>There are no Ads you have posted</h2>
            })
            return adsList
            // this.setState({list: adsList})
        }
        else {
            console.log('Error')
            return false
            // this.setState({list: false})
        }
    }
    render() {
        let { categories, userId, isLogedIn, history } = this.props
        let list = this.getMyAdsList()

        console.log(list)
        return (
            
            <>
                {isLogedIn ?
                    <div className='myads'>
                        <div>
                            <h3>My Ads</h3>

                            {list.length > 0 ?
                                list.map((data) => {
                                    return (
                                        <div className='myadsList' key={data.postId}>
                                            <div className='postTime'>
                                                <p>From: Oct 24, 2020</p>
                                            </div>
                                            <div className='myadsPostDetail'>
                                                <div className='detailArea'>
                                                    <img src={data.adsImages[0]} width='auto' height='45px' onClick={() => this.props.getProductKey({ data, history })} />
                                                    <p className='imageTitle' onClick={() => this.props.getProductKey({ data, history })}>{data.name}</p>
                                                    <p className='imagePrice'>{'Rs. ' + data.price}</p>
                                                    <i className='fas fa-times' onClick={() => this.props.removeAd(data, this.props)}></i>
                                                    {/* {ellipsis ? <p className='removeAdList'>Remove</p>: ''} */}
                                                </div>
                                                <hr />
                                                <div className='myadsPostFooter'>
                                                    <p><i className='fas fa-eye'></i> View</p>
                                                    <p><i className='fas fa-heart'></i> Likes</p>
                                                    <button>Edit Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <h2>There is no Ads you have posted</h2>
                            }

                        </div>


                    </div> : history.push('/olx-')

                }
            </>
        )

    }

}

const mapStateToProps = (state) => ({
    categories: state.root.categories,
    userId: state.root.uid,
    isLogedIn: state.root.isLogedIn
})
const mapDispatchToProp = (dispatch) => ({
    get_post: () => dispatch(get_post),
    checkAuth: () => dispatch(checkAuth()),
    getProductKey: (props) => dispatch(getProductKey(props)),
    removeAd: (data, props) => dispatch(removeAd(data, props))


})
export default connect(mapStateToProps, mapDispatchToProp)(MyAds)

// {

// }