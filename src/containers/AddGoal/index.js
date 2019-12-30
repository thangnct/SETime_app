import React, { Component } from "react";
import { connect } from "react-redux";
import AddGoal from "../../components/AddGoal";

class AddGoalContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <AddGoal
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
)(AddGoalContainer)