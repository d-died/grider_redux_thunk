import React from "react";
import { connect } from 'react-redux'
// import { fetchUser } from '../actions'


class UserHeader extends React.Component {
    // when we first started to build this component, it is meant to just take in 1 single user
    // the thing is, though, that we pass this component the ENTIRE list of users, which is bad practice. 
    // the lil bb component isn't suited for such a heavy load. SO ... we refactored. 
    // (everything that was eliminated in the refactor is commented out)

    // we took this out after we combined the 2 action creators
    // componentDidMount() {
    //     this.props.fetchUser(this.props.userId)
    // }

    

    render() {
        // const user = this.props.users.find(user =>  user.id === this.props.userId)
        // we translated the line above into the find in mapStateToProps

        const { user } = this.props

        if (!user) {
            return null
        }
        return(
            <div className="header">
                { user.name }
            </div>
        )
    }

}
// ownProps are the props that are ABOUT to go into the component
const mapStateToProps = (state, ownProps) => {
    return { users: state.users.find(user => user.id === ownProps.userId ) }
}

export default connect(mapStateToProps)(UserHeader)