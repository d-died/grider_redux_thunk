import React from "react";
import { connect } from 'react-redux'
import { fetchUser } from '../actions'


class UserHeader extends React.Component {
    // when we first started to build this component, it is meant to just take in 1 single user
    // the thing is, though, that we pass this component the ENTIRE list of users, which is bad practice. 
    // the lil bb component isn't suited for such a heavy load. SO ... we refactored. 
    // (everything that was eliminated in the refactor is commented out)

    componentDidMount() {
        this.props.fetchUser(this.props.userId)
    }

    

    render() {
        const user = this.props.users.find(user =>  user.id === this.props.userId)

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

const mapStateToProps = (state) => {
    return { users: state.users }
}

export default connect(mapStateToProps, { fetchUser })(UserHeader)