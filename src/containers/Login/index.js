import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "../../components/Login";

class LoginContainer extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Login
                navigation={this.props.navigation}
            />
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer)