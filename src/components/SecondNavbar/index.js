import React from 'react'
import { connect } from 'react-redux'
import { get_category } from '../../store/action'
import './style.css'

class SecondNavbar extends React.Component {
    constructor() {
        super()
        this.state = {
            clicked: false,
            categ: ['Car', 'Moter Bike', 'House', 'Clothes']
        }
    }
    handleCategories = () => {
        this.setState({
            clicked: !this.state.clicked
        })
        console.log(this.state.clicked)
    }
    componentDidMount(){
        this.props.get_category()
    }
    render() {
        const { clicked } = this.state
        return (
            <div>
                <nav className="miniNavbar">
                    <h4 className={clicked? 'activeAllCat': 'categories'} onClick={this.handleCategories}>
                        ALL CATEGORIES <i className={clicked ? 'fas fa-angle-up' : 'fas fa-angle-down'}></i>
                    </h4>
                    <div className={clicked ? 'allCategories' : 'hideCategories'}>
                        All Categories
                    </div>
                    {/* <ul className="miniNavItems">
                        {this.state.categ.map((item, key) => {
                            return (
                                <li key={key}>{item}</li>
                            )
                        })}
                    </ul> */}
                </nav>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProp = (dispatch)=>({
    get_category: ()=>dispatch(get_category)
})

export default connect(mapStateToProps, mapDispatchToProp)(SecondNavbar)