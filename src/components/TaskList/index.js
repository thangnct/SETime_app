import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'timesheetApp.db' });
import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    FlatList, Dimensions
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {
    Tabs,
    Tab,
} from "native-base";
import TaskListStatus from "../../containers/TaskListStatus"



export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            taskListWorkingOn: [
            ],
            taskListCompleted: [
                { id: "1", taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },

                { id: "3", taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },
                { id: "4", taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
                { id: "6", taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },
            ],
            isLoading: false, isSuccess: false,
            timeStamp: 0
        }

    }
    componentDidUpdate(prevProps, prevState) {
        let propsTimeStamp = this.props.navigation.getParam("timeStamp") ? this.props.navigation.getParam("timeStamp") : 0
        let reloadTab = this.props.navigation.getParam("reloadTab");
        if (propsTimeStamp != this.state.timeStamp) {
            this.setState({ timeStamp: propsTimeStamp })
            this.getAllTask(reloadTab)
        }
    }
    render() {
        console.log(this.state, "STATE")
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.header} >
                    <View style={styles.top} >
                        <View style={styles.info}>
                            <Text style={styles.name}>Tasks List</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Tabs
                        tabBarUnderlineStyle={{ backgroundColor: "#F2994A" }}
                        locked
                        onChangeTab={({ ref }) => {
                            console.log("lalalla: ", ref.props.heading)
                            if (ref.props.heading == "Working on") {
                                // this.getAllTask("all")
                                this.getAllTask("workingon")
                            } else if (ref.props.heading == "Completed") {
                                this.getAllTask("completed")
                            }
                        }}
                    >
                        <Tab
                            heading="Working on"
                            activeTextStyle={{ textAlign: "center", color: "#F2994A", fontWeight: "bold" }}
                            activeTabStyle={{ backgroundColor: "#FFFFFF" }}
                            tabStyle={{ backgroundColor: "#FFFFFF" }}
                            textStyle={{ color: "#979797", textAlign: "center", fontWeight: "bold" }}
                        >
                            <TaskListStatus
                                taskList={this.state.taskListWorkingOn}
                                navigation={this.props.navigation}
                            //loading={loading}
                            />

                        </Tab>
                        <Tab
                            heading="Completed"
                            activeTextStyle={{ textAlign: "center", color: "#F2994A", fontWeight: "bold" }}
                            activeTabStyle={{ backgroundColor: "#FFFFFF" }}
                            tabStyle={{ backgroundColor: "#FFFFFF" }}
                            textStyle={{ color: "#979797", textAlign: "center", fontWeight: "bold" }}
                        >
                            <TaskListStatus
                                taskList={this.state.taskListCompleted}
                                navigation={this.props.navigation}
                            //loading={loading}
                            />
                        </Tab>

                    </Tabs>

                </View>

            </SafeAreaView>

        );
    }
    getAllTask = (taskStatus) => {
        this.setState({ isLoading: true, isSuccess: false })
        if (taskStatus == "all") {
            db.transaction(async tx => {
                await tx.executeSql(
                    'select * from table_task', [], (tx, res) => {
                        // 'select from table_task inner join table_goal on table_task.goalId = table_goal.id', [], (tx, res) => {
                        let temp = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            temp.push(res.rows.item(i));
                        }
                        console.log(temp, "all tasks")

                    }, (tx, err) => {
                        console.log(tx, "err")
                        this.setState({
                            isLoading: false, isSuccess: false
                        });
                    }
                );
            })
        } else {
            db.transaction(async tx => {
                await tx.executeSql(
                    'select table_task.id, isAllDay, date, note, goalId, taskStatus, taskTitle, table_task.startTime, table_task.endTime, color, goalTitle from table_task inner join table_goal on table_task.goalId = table_goal.id where taskStatus = ?', [taskStatus], (tx, res) => {
                        // 'select * from table_task inner join table_goal on table_task.goalId = table_goal.id where taskStatus = ?', [taskStatus], (tx, res) => {
                        let temp = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            temp.push(res.rows.item(i));
                        }
                        console.log(temp, "task")
                        if (taskStatus == "workingon") {
                            this.setState({
                                isLoading: false, isSuccess: true,
                                taskListWorkingOn: temp
                            })
                        } else if (taskStatus == "completed") {
                            this.setState({
                                isLoading: false, isSuccess: true,
                                taskListCompleted: temp
                            })
                        }
                    }, (tx, err) => {
                        console.log(tx, "err")
                        this.setState({
                            isLoading: false, isSuccess: false
                        });
                    }
                );
            })
        }

    }
}
