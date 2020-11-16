import React from 'react'
import Card from '../../components/Card'
import './style.css'
import banner from '../../assets/images/banner.PNG'
import { connect } from 'react-redux'
import { get_post, get_userInfo } from '../../store/action'


class Content extends React.Component {
    constructor() {
        super()
        this.state = {
            // uid:''
        }

    }
    componentDidMount() {
        this.props.get_post()
    }
  
    render() {

        // let x = []
        let { categories, userId} = this.props
        
        return (
            <div className="">
                <div>
                    <img src={banner} alt="Banner" width="100%" />
                </div>
                <div className="Content">
                    <div className="Ads">
                        {
                            categories ?
                                categories.map((val)=>{
                                    // console.log(val)
                                    if(val.postOwner !== userId){
                                        return <Card data={val} isLogedIn={this.props.isLogedIn} history={this.props.history} />  
                                    }
                                    return(console.log())
                                })
                                : console.log('data nai hay')

                    }
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.root.uid,
    categories: state.root.categories,
    isLogedIn: state.root.isLogedIn, 
    state_: state.root

})
const mapDispatchToProp = (dispatch) => ({
    get_post: () => dispatch(get_post()),
    get_userInfo: (userId) => dispatch(get_userInfo(userId))
})

export default connect(mapStateToProps, mapDispatchToProp)(Content)