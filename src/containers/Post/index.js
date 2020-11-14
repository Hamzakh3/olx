import React from 'react'
import './style.css'
import add_a_photo_black from '../../assets/images/add_a_photo-24px.svg'
import add_a_photo from '../../assets/images/add_a_photo-white-18dp.svg'
import { connect } from 'react-redux'
import { checkAuth, get_userInfo, create_post } from '../../store/action'



class PostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loader:false,
            category: [
                ['Mobiles', 'fas fa-mobile-alt'],
                ['Vehicles', 'fas fa-car-alt'],
                ['Electronics', 'fas fa-desktop'],
                ['Bikes', 'fas fa-motorcycle'],
                ['Fashion', 'fas fa-tshirt'],
                ['Kids', 'fas fa-baby'],
                ['other', 'fas fa-exclamation']
            ],
            selectedCategory: null,
            showCategories: true,
            showNumber: true,
            phoneNumber:'',
            txtName: '',
            txtTitle: '',
            txtDescription: '',
            txtPrice: '',
            image: '',
            txtReviewName: '',
            selectState: '',
            images: [],
            imagesValues: []

        }
    }
    chooseCategory = (e) => {
        const key = e.target.getAttribute('id')
        // console.log(e.target.getAttribute('id'))

        this.setState({
            selectedCategory: this.state.category[key],
            showCategories: !this.state.showCategories
        })

    }
    handleValueChange = (val) => {
        this.setState({
            [val.target.name]: val.target.value
        })
        // console.log(val.target.value)
    }
    handleValueFile = (val) => {
        const { images, imagesValues } = this.state
        // console.log(val.target.files[0])

        this.setState({
            [this.state.images]: images.push(val.target.files[0].name),
            [this.state.imagesValues]: imagesValues.push(val.target.files[0])
        })
    }
    deleteUploadImage = (e => {
        const { images, imagesValues } = this.state
        this.setState({
            [this.state.images]: images.splice(e.target.id, 1),
            [this.state.imagesValues]: imagesValues.splice(e.target.id, 1)

        })
    })
    componentDidMount() {
        this.props.checkAuth()
        this.props.get_userInfo(this.props.userId)

    }
    render() {
        const { category, selectedCategory, showCategories, phoneNumber, selectState,
            showNumber, txtName, txtTitle, txtDescription, txtPrice, images, txtReviewName } = this.state
        // console.log(this.state)
        const invalid = selectedCategory === null ||
            txtName === '' ||
            txtTitle === '' ||
            txtDescription === '' ||
            txtPrice === '' || txtPrice < 60 ||
            txtReviewName === '' ||
            selectState === '' ||
            images.length === 0
        const { isLogedIn, userInfo,loader } = this.props
        
        // console.log('===POST', userInfo)




        return (
            <>
                {isLogedIn ?

                    <div className='postForm'>
                        <h1>POST YOUR AD</h1>
                        <div className="form">
                            {!selectedCategory ?
                                console.log() :
                                <div className="selectedCategory">
                                    <h2>SELECTED CATEGORY</h2>
                                    <small>{selectedCategory ? selectedCategory[0] : null}</small>
                                    <small className="changeCateg" onClick={() => this.setState({ showCategories: !showCategories })}>Change</small>
                                </div>
                            }

                            {showCategories ?
                                <div className='categories'>
                                    <h2>CHOOSE CATEGORY</h2>
                                    <ul className='chooseCategories'>

                                        {category.map((val, key) => {
                                            return (
                                                <li id={key} key={key} onClick={(e) => { this.chooseCategory(e) }}>
                                                    <i className={val[1]}></i>{val[0]}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div> :
                                console.log()
                            }
                            {!selectedCategory ?
                                console.log() :
                                <>
                                    <hr />
                                    <div className="includeSomeDetails">
                                        <h2>INCLUDE SOME DETAILS</h2>
                                        <div>
                                            <label>Name <sup>*</sup></label>
                                            <input type="text" name='txtName'
                                                onChange={(e) => this.handleValueChange(e)}
                                                placeholder="Company Name or Type"
                                                value={txtName} />
                                            <small className="info"></small>
                                        </div>
                                        {/* <div>
                                    <label>Condition <sup>*</sup></label>
                                    <p>
                                        <span className="radioSelection new">New</span>
                                        <span className="radioSelection used">Used</span>
                                    </p>
                                    <small className="info"></small>
                                </div> */}
                                        <div>
                                            <label>Add Title <sup>*</sup></label>
                                            <input type="text" name='txtTitle'
                                                onChange={(e) => this.handleValueChange(e)}
                                                value={txtTitle} />
                                            <small className="info">Mention the key features of your item (e.g. brand, model, age, type)</small>
                                        </div>
                                        <div>
                                            <label>Add Description <sup>*</sup></label>
                                            <textarea className='txtArea' rows="4" name="txtDescription"
                                                onChange={(e) => this.handleValueChange(e)}
                                                value={txtDescription}></textarea>
                                            <small className="info">Include condition, features and reason for selling</small>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="setAPrice">
                                        <h2>SET A PRICE</h2>
                                        <div>
                                            <label>Price <sup>*</sup></label>
                                            <input type="number" name="txtPrice"
                                                onChange={(e) => this.handleValueChange(e)}
                                                value={txtPrice} />
                                            <small className="info"></small>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="uploadPhotos">
                                        <h2>UPLOAD UPTO 6 PHOTOS</h2>
                                        <div className="photos">
                                            {images.length >= 6 ? '' :
                                                <div className=''>
                                                    <input id="myInput" type="file" name='image' onChange={(e) => this.handleValueFile(e)}
                                                        style={{ visibility: "hidden" }} />
                                                    <span title="attach file" className="attachFileSpan addPhoto"
                                                        onClick={images.length < 6 ? () => document.getElementById('myInput').click() : ''}>
                                                        <img src={add_a_photo} alt="icon" width='50px' />
                                                        <span>Add Photo</span>
                                                    </span>
                                                </div>

                                            }
                                            {images.length === 0 ? '' :
                                                <ul className="imagesName">
                                                    {images.length <= 6 ?
                                                        <>
                                                            {images.map((val, key) => {
                                                                console.log(key, val)
                                                                return (
                                                                    <li title={val} className='imageList' id={key} key={key}
                                                                        onClick={(e) => { this.deleteUploadImage(e) }}>
                                                                        <i className="fas fa-times" ></i>
                                                                        {val.slice(0, 15) + '..'} </li>
                                                                )
                                                            })}
                                                        </> :
                                                        document.getElementById('myInput').style.display = 'none'



                                                    }
                                                </ul>
                                            }
                                            {/* {photos.map((val) => {
                                                return (
                                                    <>
                                                        <div>
                                                    <input id={`myInput` + val} name={`image` + val} type="file" style={{ visibility: "hidden" }} />
                                                    <span title="attach file" name={`myInput` + val} className="attachFileSpan" onClick={(e) => 
                                                        document.getElementById(e.target.parentNode.firstChild.name).click() }>
                                                        <img src={add_a_photo} alt="icon" width='50px' />
                                                    </span>
                                                </div>
                                                    </>
                                                )
                                            })
                                            } */}
                                        </div>
                                        <small className="info"></small>
                                    </div>
                                    <hr />
                                    <div className="confirmLocation">
                                        <h2>CONFIRM YOUR LOCATION</h2>
                                        <div>
                                            <label>State <sup>*</sup></label>
                                            <select name='selectState' value={selectState} onChange={(e) => this.handleValueChange(e)}>
                                                <option value="sindh">Sindh</option>
                                                <option value="punjab">Punjab</option>
                                                <option value="balochistan">Balochistan</option>
                                                <option value="gilgit">Gilgit Baldistan</option>
                                                <option value="kpk">K P K</option>
                                            </select>
                                            <small className="info"></small>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="reviewDetails">
                                        <h2>REVIEW YOUR DETAILS</h2>
                                        <div className="userReview">
                                            <img src={add_a_photo_black} alt="photo" width="100px" height="100px" />


                                            <div>
                                                <label>Name <sup>*</sup></label>
                                                <input type="text" name='txtReviewName'
                                                    onChange={(e) => this.handleValueChange(e)}
                                                    value={txtReviewName === '' ? userInfo.txtUserName : txtReviewName} />
                                                <small className="info"></small>
                                            </div>
                                        </div>
                                        <div className="firstSecond">
                                            <div className="firstLeft">
                                                <p>Your Phone Number </p>
                                                <p className={showNumber ? 'unhide' : 'hide'}>{userInfo.txtNumber}</p>

                                            </div>
                                            <div className="secondRight">
                                                <p>Show my Phone number on my ads</p>
                                                <p className="showNumber" onClick={() => this.setState({ showNumber: !showNumber, phoneNumber:showNumber===true? '':userInfo.txtNumber })}>
                                                    <span className={showNumber ? 'yes' : 'no'}></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="postNow">
                                        <button className={invalid ? 'disableBtn' : 'post'} disabled={invalid}
                                            onClick={() => {this.props.create_post(this.state, this.props); this.setState({loader:true})} }>
                                            Post Now 
                                        </button><div className={loader && this.state.loader?'loader':''}></div>
                                        
                                    </div>
                                </>

                            }

                        </div>
                    </div> :
                    this.props.history.replace('/login')

                }
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    isLogedIn: state.root.isLogedIn,
    userId: state.root.uid,
    userInfo: state.root.userInfo,
    loader:state.root.loader
})
const mapDispatchToProp = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth()),
    get_userInfo: (id) => dispatch(get_userInfo(id)),
    create_post: (postState, props) => dispatch(create_post(postState, props))
})
// export default PostForm
export default connect(mapStateToProps, mapDispatchToProp)(PostForm)