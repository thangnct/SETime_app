import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneValidate from "../../components/PhoneValidate";

class PhoneValidateContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PhoneValidate
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
)(PhoneValidateContainer)