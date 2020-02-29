import React, { Component } from "react";
import { connect } from "react-redux";
import AddGoal from "../../components/AddGoal";
import { add_goal } from "../../actions";

class AddGoalContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <AddGoal
                navigation={this.props.navigation}
                dispatchAddGoal={this.props.dispatchAddGoal}
                work={this.props.work}
                auth={this.props.auth}
            />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    work: state.work
});

const mapDispatchToProps = dispatch => ({
    dispatchAddGoal: (data) => dispatch(add_goal(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGoalContainer)