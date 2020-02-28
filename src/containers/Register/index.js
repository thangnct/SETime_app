import React, { Component } from "react";
import { connect } from "react-redux";
import Register from "../../components/Register";
import { register } from "../../actions";
class RegisterContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Register
                navigation={this.props.navigation}
                dispatchRegister={this.props.dispatchRegister}
                auth={this.props.auth}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    dispatchRegister: (data) => dispatch(register(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer)