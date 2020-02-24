import React, { Component } from "react";
import { connect } from "react-redux";
import AddTask from "../../components/AddTask";

class AddTaskContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <AddTask
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
)(AddTaskContainer)