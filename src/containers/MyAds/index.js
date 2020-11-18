import React from 'react'
import { connect } from 'react-redux'
import { get_post, checkAuth, getProductKey, removeAd } from '../../store/action'
import './Style.css'
import { createBrowserHistory  } from 'history'




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
        // await this.props.get_post()
        let { categories, userId} = this.props
        let adsList = []
        if (this.props.categories) {
            categories.map((data) => {
                if (data.postOwner === userId) {
                    // console.log(data)
                    adsList.push(data)
                }
                return console.log('')
            })
            if(adsList.length > 0){
                return adsList
            }
            else{
                return 'noAds'
            }
        }
        else{
            console.log('Error')
            return false
        }
    }

    render() {
        let { isLogedIn, history } = this.props
        createBrowserHistory ()
        let list = this.getMyAdsList()

        // console.log(history, this.props)
        return (
        
            <>
                {isLogedIn ?
                    <div className='myads'>
                        <div>
                            <h3>My Ads</h3>

                            {list !== 'noAds' && list !== false?
                                list.map((data) => {
                                    return (
                                        <div className='myadsList' key={data.postId}>
                                            <div className='postTime'>
                                                <p>From: Oct 24, 2020</p>
                                            </div>
                                            <div className='myadsPostDetail'>
                                                <div className='detailArea'>
                                                    <img src={data.adsImages[0]} alt='Product_Image' width='auto' height='45px' onClick={() => this.props.getProductKey({ data, history })} />
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
                                }): list === 'noAds' ? 
                                    <h2>There is no Ads you have posted</h2>:
                                    history.push('/olx-')

                                
                            
                                
                            }

                        </div>


                    </div> : console.log('HAMZA')

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