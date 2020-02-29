import React, { Component } from "react";
import { connect } from "react-redux";
import AddTask from "../../components/AddTask";
import { Alert, AsyncStorage } from "react-native"
import { add_task, get_goal, reset } from "../../actions";
class AddTaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listGoalWorkingOn: null
        }
    }

    async componentWillMount() {
        const { token } = this.props.auth;
        this.props.dispatchGetGoal({
            type: "working_on",
            token: token,
        })
    }
    async componentWillReceiveProps(nextProps) {
        const { isLoading, isSuccess, dataGetGoal } = nextProps.work
        if (dataGetGoal && dataGetGoal !== this.props.work.dataGetGoal && isLoading == false && isSuccess == true) {
            if (dataGetGoal.code == 1) {
                this.state.listGoalWorkingOn = dataGetGoal.goals
            } else if (dataGetGoal.code == -99) {
                Alert.alert("Notification", "There is a trouble, please try again later.")
            } else {
                Alert.alert("Notification", dataGetGoal.message)
            }
        }
    }

    render() {

        return (
            <AddTask
                navigation={this.props.navigation}
                dispatchAddTask={this.props.dispatchAddTask}
                dispatchReset={this.props.dispatchReset}
                work={this.props.work}
                auth={this.props.auth}
                listGoalWorkingOn={this.state.listGoalWorkingOn || []}
            />
        )
    }
}

const mapStateToProps = state => ({
    work: state.work,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    dispatchAddTask: (data) => dispatch(add_task(data)),
    dispatchGetGoal: (data) => dispatch(get_goal(data)),
    dispatchReset: (data) => dispatch(reset(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTaskContainer)