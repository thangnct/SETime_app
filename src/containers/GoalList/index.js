import React, { Component } from "react";
import { connect } from "react-redux";
import GoalList from "../../components/GoalList";
import { get_goal, reset } from "../../actions";
class GoalListContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <GoalList
                navigation={this.props.navigation}
                dispatchGetGoal={this.props.dispatchGetGoal}
                auth={this.props.auth}
                work={this.props.work}
                isLoading={this.props.work.isLoading || false}
            />
        )
    }
}

const mapStateToProps = state => ({
    work: state.work,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    dispatchGetGoal: (data) => dispatch(get_goal(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoalListContainer)