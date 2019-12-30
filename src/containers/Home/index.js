import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../../components/Home";

class HomeContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Home
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
)(HomeContainer)