import React, { Component } from "react";
import { connect } from "react-redux";
import VerifyPhone from "../../components/VerifyPhone";
import { register } from "../../actions";
class VerifyPhoneContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <VerifyPhone
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
    dispatchRegister: (data) => dispatch(register(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyPhoneContainer)