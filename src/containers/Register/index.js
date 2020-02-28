import React, { Component } from "react";
import { connect } from "react-redux";
import Register from "../../components/Register";
import { register, check_account_exists } from "../../actions";
class RegisterContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Register
                navigation={this.props.navigation}
                dispatchRegister={this.props.dispatchRegister}
                dispatchCheck_account_exists={this.props.dispatchCheck_account_exists}
                auth={this.props.auth}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    dispatchRegister: (data) => dispatch(register(data)),
    dispatchCheck_account_exists: (data) => dispatch(check_account_exists(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer)