import React, { Component } from "react";
import { connect } from "react-redux";
import GoalListStatus from "../../components/GoalListStatus";

class GoalListStatusContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <GoalListStatus
                navigation={this.props.navigation}
                goalList={this.props.goalList}
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
)(GoalListStatusContainer)