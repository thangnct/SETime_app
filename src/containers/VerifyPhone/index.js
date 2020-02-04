import React, { Component } from "react";
import { connect } from "react-redux";
import VerifyPhone from "../../components/VerifyPhone";

class VerifyPhoneContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <VerifyPhone
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
)(VerifyPhoneContainer)