import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    FlatList,
} from "react-native";
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

export default class TaskListStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: this.props.taskList || []

        }

    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.taskList}
                    renderItem={({ item }) => <View style={{
                        height: 60, borderRadius: 5, flexDirection: "row", justifyContent: "flex-start",
                        alignItems: "center", marginTop: 15, borderWidth: 0.5, borderColor: "#AAAAAA",
                        marginRight: 20,
                        marginLeft:20
                        //   backgroundColor: "blue"
                    }}>
                        <View style={styles.checkBox}>
                            <CheckBox
                                checked={true}
                                checkedColor="#F2994A"
                            />
                        </View>
                        <View style={styles.task}>
                            <Text style={styles.weekday}>{item.taskTitle}</Text>
                            <Text style={styles.timeBound}>{item.timeBound}</Text>
                        </View>
                        <View style={styles.color}>
                            <Icon name="circle" color={item.color} size={25} />
                        </View>
                    </View>}
                />
                <ActionButton buttonColor="#F2994A">
                    <ActionButton.Item buttonColor='#FFFFFF' title="Add goal" onPress={() => this.props.navigation.navigate("AddGoal")}>
                        <Icon name="circle" color="#F2994A" size={20} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#FFFFFF' title="Add task" onPress={() => { this.props.navigation.navigate("AddTask") }}>
                        <Icon name="tasks" color="#F2994A" size={20} />
                    </ActionButton.Item>
                </ActionButton>
            </SafeAreaView>

        );
    }
}
