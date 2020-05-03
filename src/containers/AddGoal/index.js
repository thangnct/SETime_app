import React, { Component } from "react";
import AddGoal from "../../components/AddGoal";


export default class AddGoalContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {               
        return (
            <AddGoal
                navigation={this.props.navigation}
                goalId={this.props.navigation.getParam("goalId") || ""}
                endTime={this.props.navigation.getParam("endTime") || ""}
                reward={this.props.navigation.getParam("reward") || ""}
                color={this.props.navigation.getParam("color") || ""}
                describe={this.props.navigation.getParam("describe") || ""}
                goalTitle={this.props.navigation.getParam("goalTitle") || ""}
                goalStatus={this.props.navigation.getParam("goalStatus") || ""}
                startTime={this.props.navigation.getParam("startTime") || ""}
            />
        )
    }
}
