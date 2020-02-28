import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneValidate from "../../components/PhoneValidate";
import { SafeAreaView } from "react-native";

class PhoneValidateContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PhoneValidate
                navigation={this.props.navigation}
                auth={this.props.auth}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhoneValidateContainer)