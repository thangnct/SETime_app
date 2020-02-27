import React, { Component } from "react";
import { connect } from "react-redux";
import TaskListStatus from "../../components/TaskListStatus";

class TaskListStatusContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TaskListStatus
                navigation={this.props.navigation}
                taskList ={this.props.taskList}
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
)(TaskListStatusContainer)