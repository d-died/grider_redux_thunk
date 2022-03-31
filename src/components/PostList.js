import React from "react"
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class PostList extends React.Component {
    //the moment the component is rendered to the screen, call fetchPosts action creator
    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        return (
            <div>
                PostList
            </div>
        )
    }
}


export default connect(null, { fetchPosts })(PostList)