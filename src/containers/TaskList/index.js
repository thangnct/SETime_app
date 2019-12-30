import React, { Component } from "react";
import { connect } from "react-redux";
import TaskList from "../../components/TaskList";

class TaskListContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TaskList
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
)(TaskListContainer)