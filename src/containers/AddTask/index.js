import React, { Component } from "react";
import { connect } from "react-redux";
import AddTask from "../../components/AddTask";
import { Alert, AsyncStorage } from "react-native"
import { add_task, get_goal, reset } from "../../actions";
class AddTaskContainer extends Component {
    constructor(props) {
        super(props);
        
    }

    

    render() {

        return (
            <AddTask
                navigation={this.props.navigation}            
                goalId={this.props.navigation.getParam("goalId")||""}                    
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