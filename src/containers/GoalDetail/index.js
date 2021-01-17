import React, { Component } from "react";
import { connect } from "react-redux";
import GoalDetail from "../../components/GoalDetail";
import { Alert, AsyncStorage } from "react-native"
import { add_task, get_goal, reset } from "../../actions";
class GoalDetailContainer extends Component {
    constructor(props) {
        super(props);

    }



    render() {        
        return (
            <GoalDetail
                navigation={this.props.navigation}
                goalId={this.props.navigation.getParam("goalId")}
                exprirationDate ={this.props.navigation.getParam("exprirationDate ")}
                reward={this.props.navigation.getParam("reward")}
                color={this.props.navigation.getParam("color")}
                describe={this.props.navigation.getParam("describe")}
                goalTitle={this.props.navigation.getParam("goalTitle")}
                goalStatus={this.props.navigation.getParam("goalStatus")}
                startTime={this.props.navigation.getParam("startTime")}                                
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
)(GoalDetailContainer)