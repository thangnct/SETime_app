import React, { Component } from "react";
import GoalList from "../../components/GoalList";
export default class GoalListContainer extends Component {
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

