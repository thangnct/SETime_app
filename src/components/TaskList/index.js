import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAddButton: false
        }
    }
    static navigationOptions = {
        headerMode: null,
    };
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.body}>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                    <Text>TaskList</Text>
                </ScrollView>

                {this.state.openAddButton ? this.renderAddTaskButton() : null}
                {this.state.openAddButton ? this.renderAddGoalButton() : null}
                <TouchableOpacity style={[styles.addButton]}
                    onPress={this.changeAddButtonState}
                >
                    <Icon name="plus" color="#FFFFFF" size={28} />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
    changeAddButtonState = () => {
        this.setState({
            openAddButton: !this.state.openAddButton
        })
    }
    renderAddGoalButton = () => {
        return <TouchableOpacity style={[styles.addGoalButton]}
            onPress={() => {
                this.setState({
                    openAddButton: !this.state.openAddButton
                }, () => { })
            }}
        >
            <Icon name="bullseye" color="#C4C4C4" size={20} />
        </TouchableOpacity>
    }

    renderAddTaskButton = () => {
        return <TouchableOpacity style={[styles.addTaskButton]}
            onPress={() => {
                this.setState({
                    openAddButton: !this.state.openAddButton
                }, () => {
                    this.props.navigation.navigate("AddTask")
                })
            }}
        >
            <Icon name="tasks" color="#C4C4C4" size={20} />
        </TouchableOpacity>
    }
}
