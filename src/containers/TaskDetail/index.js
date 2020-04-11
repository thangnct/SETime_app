import React, { Component } from "react";
import { connect } from "react-redux";
import TaskDetail from "../../components/TaskDetail";
import { Alert, AsyncStorage } from "react-native"
import { add_task, get_goal, reset } from "../../actions";
class TaskDetailContainer extends Component {
    constructor(props) {
        super(props);

    }



    render() {

        return (
            <TaskDetail
                navigation={this.props.navigation}
                taskId={this.props.navigation.getParam("taskId")}
                goalId={this.props.navigation.getParam("goalId")}
                taskTitle={this.props.navigation.getParam("taskTitle")}
                isAllDay={this.props.navigation.getParam("isAllDay")}
                note={this.props.navigation.getParam("note")}
                startTime={this.props.navigation.getParam("startTime")}
                endTime={this.props.navigation.getParam("endTime")}
                color={this.props.navigation.getParam("color")}
                goalTitle={this.props.navigation.getParam("goalTitle")}
                id={this.props.navigation.getParam("id")}

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
)(TaskDetailContainer)