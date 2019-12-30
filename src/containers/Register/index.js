import React, { Component } from "react";
import { connect } from "react-redux";
import Register from "../../components/Register";

class RegisterContainer extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Register
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
)(RegisterContainer)