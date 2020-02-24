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
    auth: state.auth,
    goals: state.goal,
    tasks: state.task
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer)