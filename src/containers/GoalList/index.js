import React, { Component } from "react";
import { connect } from "react-redux";
import GoalList from "../../components/GoalList";

class GoalListContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <GoalList
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
)(GoalListContainer)