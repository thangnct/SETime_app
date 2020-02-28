import React, { Component } from "react";
import { connect } from "react-redux";
import Option from "../../components/Option";

class OptionContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Option
                navigation={this.props.navigation}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionContainer)