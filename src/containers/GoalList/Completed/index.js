import React, { Component } from "react";
import { connect } from "react-redux";
import CompletedTask from "../../../components/TaskList/WorkingOn";

class CompletedTaskContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <CompletedTask
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
)(CompletedTaskContainer)