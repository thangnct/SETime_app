import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "../../components/Login";
import { login } from "../../actions";
class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Login
                navigation={this.props.navigation}
                dispatchLogin= {this.props.dispatchLogin}
                auth={this.props.auth}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    dispatchLogin: (data) => dispatch(login(data))
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer)