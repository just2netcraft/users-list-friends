import React from "react";
import {connect} from "react-redux";
import UserDetails from "./UserDetails";
import UserPosts from "./UserPosts"
import UserAdd from "./UserAdd";
import {getUser} from "../../../actions/creators"

import "./user-page.scss";


class UserPage extends React.Component {

    constructor(props){
        super(props);

        if( props.match.params.id ){
            props.getUser(props.match.params.id);
        }
    }

    componentWillReceiveProps( {match} ){
        if( match.params.id &&  match.params.id != this.props.match.params.id){
            this.props.getUser(match.params.id);
        }
    }

    render(){
        if(this.props.isLoading)
            return <main className="user-page">Loading...</main>;

        return (<main className="user-page">
                    <UserAdd user={ this.props.user } />
                    <UserDetails user={ this.props.user }/>
                    <UserPosts posts={ this.props.posts }/>
                </main>)
    }
}

function mapStateToProps(state){
    return {
        isLoading: state.users.selectedUser.isLoading,
        user: state.users.selectedUser.details,
        posts: state.users.selectedUser.posts
    }
}

function mapDispatchToProps(dispatch){
    return {
        getUser: id => dispatch( getUser(id) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
