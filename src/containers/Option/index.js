import React, { Component } from "react";
import { connect } from "react-redux";
import Option from "../../components/Option";
import { logoutSystem } from "../../actions";

class OptionContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Option
                navigation={this.props.navigation}
                logoutSystem={this.props.logoutSystem}
                auth={this.props.auth}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
    logoutSystem: () => dispatch(logoutSystem())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionContainer)