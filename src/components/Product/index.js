import React from 'react'
import './style.css'
import car from '../../assets/images/car.jpg'
import other from '../../assets/images/olx_logo.png'
import geoLocation from '../../assets/images/geoLocation.png'


class Product extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container">
                <div className="firstSide">
                    <div className="imageSlider">
                        <p className='featured'>Featured</p>
                        <div className="selectedImage">
                            <img src={car} alt="Car" width="auto" height="400px" />
                        </div>
                        <ul>
                            <li>
                                <img src={car} alt="Car" width="100%" />
                            </li>
                            <li>
                                <img src={car} alt="Car" width="100%" />
                            </li>
                            <li>
                                <img src={car} alt="Car" width="100%" />
                            </li>
                            <li>
                                <img src={car} alt="Car" width="100%" />
                            </li>
                            <li>
                                <img src={car} alt="Car" width="100%" />
                            </li>

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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quibusdam unde quisquam sapiente impedit quae, accusantium cumque repellendus voluptatum saepe veniam perspiciatis officiis quam dolorum molestias at. Amet, odio delectus.</p>
                        </div>
                    </div>
                </div>
                <div className="secondSide">
                    <div className="productOverview">
                        <h3 className="fav"><i className="far fa-heart"></i></h3>
                        <h3 className="share"><i className="fas fa-share-alt"></i></h3>
                        <h4>Rs 400,000 - Flexible</h4>
                        <p>KIA Picanto 2020 Get On Easy Monthly Installment.</p>
                        <div>
                            <small>Askari iv, Karachi, Sindh</small>
                            <small>Oct 01</small>
                        </div>
                    </div>
                    <div className="sellerDescription">
                        <h4>Seller Description</h4>
                        <ul className="user">
                            <li className="userImageRound"><img src={other} alt="Pic" width="35px" height="35px" /></li>
                            <li className="userDetail">
                                <ul>
                                    <li><h4>Syeda Mehak</h4></li>
                                    <li><small>Member since Jul 2020</small></li>
                                </ul>
                            </li>
                            <li className="forMore"><i className="fas fa-angle-right"></i></li>
                        </ul>
                        <button className="chatWithSeller">Chat wit Seller</button>
                        <p><i className=" fas fa-phone-alt"></i> <small>** *** ****</small> <small>show number</small></p>
                    </div>
                    <div className="postedIn">
                        <h4>Posted in</h4>
                        <small>Askari iv, Karachi, Sindh</small>
                        <img src={geoLocation} alt="Map" height="150px"/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Product