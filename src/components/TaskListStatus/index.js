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
        console.log()
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.taskList}
                    renderItem={({ item }) => <TouchableOpacity
                        onPress={() => {
                            console.log(item, "item")
                            this.props.navigation.navigate("TaskDetail", {
                                taskId: item.taskId,
                                goalId: item.goalId,
                                date: item.date,
                                taskTitle: item.taskTitle,
                                isAllDay: item.isAllDay,
                                note: item.note,
                                startTime: item.startTime,
                                endTime: item.endTime,
                                color: item.color,
                                goalTitle: item.goalTitle,
                                taskStatus: item.taskStatus,
                                id: item.id
                            })
                        }}
                        style={{
                            height: 60, borderRadius: 5, flexDirection: "row", justifyContent: "flex-start",
                            alignItems: "center", marginTop: 15, borderWidth: 0.5, borderColor: "#AAAAAA",
                            marginRight: 20,
                            marginLeft: 20,
                            // paddingLeft:20
                            //   backgroundColor: "blue"
                        }}>
                        <View style={styles.checkBox}>
                            <CheckBox
                                checked={item.taskStatus == "completed" ? true : false}
                                // checked={item.taskStatus == "completed"}
                                checkedColor="#F2994A"
                            />
                        </View>
                        <View style={styles.task}>
                            <Text style={styles.weekday}>{item.taskTitle}</Text>
                            <Text style={{ fontSize: 12 }}>{item.isAllDay ? item.date + " All day" : item.date + " : " + item.startTime + " - " + item.endTime}</Text>
                        </View>
                        <View style={styles.color}>
                            <Icon name="circle" color={item.color} size={25} />
                        </View>
                    </TouchableOpacity>}
                />
                <ActionButton buttonColor="#F2994A" >
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
