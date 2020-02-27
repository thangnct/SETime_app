import React, { Component } from "react";
import { connect } from "react-redux";
import WokingOnTasks from "../../../components/TaskList/WorkingOn";

class WokingOnTaskContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <WokingOnTasks
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
)(WokingOnTaskContainer)