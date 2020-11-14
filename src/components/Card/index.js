import React from 'react'
import './style.css'
// import car from '../../assets/images/car.jpg'
import {connect} from 'react-redux'
import {getProductKey} from '../../store/action'

class Card extends React.Component {
    constructor() {
        super()
        this.state = {
            heartClick: false
        }
    }
    render() {
        // this.props.checkAuth()
        // console.log(this.props)
        let { heartClick } = this.state
        const {data, history, isLogedIn} = this.props
        return (
            <div key={data.postId} className="Card" onClick={()=>
                // console.log(this.props)
                isLogedIn?this.props.getProductKey(this.props):history.push('/login')
               }>
                <div className="productImage">
                    {/* <p className="featured">{'data.featured'}</p> */}
                    <img src={data.adsImages} alt={data.name} width='100%' height='200px' />
                    {/* <p className="favourite" onClick={() => this.setState({ heartClick: !heartClick })}><i className={heartClick ? "fas fa-heart" : "far fa-heart"}></i></p> */}
                </div>
                <div className="aboutProduct">
                    <h4>Rs.{data.price}</h4>
                    <p>{data.title}</p>
                    <div className="smallDetail">
                        <small className="area">{data.province}</small>
                        <small className="date">{'Oct 30'}</small>
                    </div>
                </div>
 
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    // isLogedIn: state.root.isLogedIn,
})
const mapDispatchToProp = (dispatch)=>({
    getProductKey: (props)=>dispatch(getProductKey(props))
})
// export default Card
export default connect(mapStateToProps, mapDispatchToProp)(Card)