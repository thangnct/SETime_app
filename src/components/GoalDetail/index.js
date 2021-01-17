import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'timesheetApp.db' });
import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView, ActivityIndicator, Alert,
} from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
export default class GoalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isLoading: false,
            isSuccess: false,
            goalId: this.props.goalId ? this.props.goalId : 0,
            goalTitle: "",
            tasksOfGoal: [],
            exprirationDate: this.props.exprirationDate ? this.props.exprirationDate : "111"

        }
    }

    componentDidMount() {
        // this.taskOfGoal(this.state.goalId);
    }
    render() {
        console.log(this.state, "STATE")
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading == true ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#C4C4C4" />
                </View> :
                    <View style={{ flex: 1 }}>
                        <Toast ref="toast"
                            position="bottom"
                        />
                        <View style={styles.top}>
                            <View style={styles.backButton}>
                                <TouchableOpacity style={styles.backButton}
                                    onPress={() => { this.props.navigation.goBack() }}
                                >
                                    <Icon name="chevron-left" size={25} color={"#AAAAAA"} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.taskOption}>
                                <TouchableOpacity onPress={() => {
                                    // console.log(this.props.goalTitle, "128908")
                                    this.props.navigation.navigate("AddGoal", {
                                        goalId: this.props.goalId,
                                        goalTitle: this.props.goalTitle,
                                        exprirationDate: this.props.navigation.getParam("exprirationDate"),
                                        color: this.props.color,
                                        describe: this.props.describe,
                                        reward: this.props.reward,
                                        goalStatus: this.props.goalStatus,
                                    })
                                }}>
                                    <Text style={styles.saveText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ isLoading: true, isSuccess: false })
                                        let id = this.props.navigation.getParam("goalId");
                                        console.log(id)
                                        db.transaction(async tx => {
                                            await tx.executeSql('delete from table_goal where id = ?',
                                                [id], async (tx, res) => {
                                                    console.log(res, "excuted success");
                                                    if (res.rowsAffected > 0) {
                                                        this.setState({ isLoading: false, isSuccess: true })
                                                        Alert.alert("Delete successfully.")
                                                        this.props.navigation.navigate("GoalList", {
                                                            timeStamp: new Date().getTime()
                                                        })
                                                    } else {
                                                        this.setState({ isLoading: false, isSuccess: true })
                                                        Alert.alert("Delete failure.")
                                                        this.props.navigation.navigate("GoalList", {
                                                            timeStamp: new Date().getTime()
                                                        })

                                                    }

                                                },
                                                async (tx, err) => {
                                                    console.log(tx, "excuted false");
                                                    this.setState({ isLoading: false, isSuccess: true })
                                                    Alert.alert("Delete failure.")
                                                    this.props.navigation.navigate("GoalList", {
                                                        timeStamp: new Date().getTime()
                                                    })
                                                })
                                        })
                                    }}
                                >
                                    <Text style={styles.cancelText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                                <View style={styles.icon_label}>
                                    <Icon name="bullseye" size={25} color={this.props.navigation.getParam("color")} />
                                    {/* <Icon name="bullseye" size={25} color={this.props.navigation.getParam("color")} /> */}
                                </View>
                                <View style={styles.taskTitleContainer}>
                                    <Text style={styles.taskTitle}>{this.props.goalTitle}</Text>
                                    <Text style={{
                                        borderBottomColor: '#AAAAAA',
                                        borderBottomWidth: 1,
                                        fontSize: 12,
                                        color: "#3E3D3D"
                                    }}> {this.props.navigation.getParam("exprirationDate")}</Text>
                                </View>
                            </View>

                            <ScrollView style={{ flex: 1 }}>

                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="sticky-note" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.contentItem}>{this.props.describe}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="trophy" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.contentItem}>{this.props.reward}
                                            </Text>
                                        </View>
                                    </View>
                                </View> */}

                                {/* <View style={styles.items}>
                                    
                                </View> */}
                                {/* <Text onPress={() => { this.createTaskTable() }}>createTaskTable</Text>
                                <Text onPress={() => { this.getAllGoal("workingon") }}>getAllGoal</Text>
                                <Text onPress={() => { this.dropTaskTable() }}>drop</Text> */}
                            </ScrollView>

                            <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        let status = this.props.goalStatus == "workingon" ? "completed" : "workingon"
                                        this.changeGoalStatus(this.props.goalId, status)
                                    }}
                                    style={{
                                        width: 50, height: 50, backgroundColor: "#F2994A", borderRadius: 50,
                                        justifyContent: "center", alignItems: "center",
                                        // backgroundColor:"red",
                                        bottom: 25, right: 20
                                    }}
                                >
                                    <Icon name={this.props.navigation.getParam("goalStatus") == "workingon" ? "check" : "undo"} color="#ffffff" size={20} />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>}

            </SafeAreaView>
        );
    }
    validate = () => {
        if (this.state.taskTitle.length == 0) {
            this.refs.toast.show("Task title is not null.");
            return false
        } else if (this.state.goalSupport.length == 0) {
            this.refs.toast.show("You must pick a goal.");
            return false
        } else {
            return true
        }
    }

    taskOfGoal = (goalId) => {
        this.setState({ isLoading: true, isSuccess: false })
        db.transaction(async tx => {
            await tx.executeSql('select table_task.id as "taskid", goalTitle, table_goal.id as "goalId", taskTitle, isAllday, table_task.startTime, table_task.endTime, taskStatus, note, color from table_goal inner join table_task on table_goal.id = table_task.goalId where table_goal.id = ?',
                [goalId], (tx, res) => {
                    let temp = [];
                    for (let i = 0; i < res.rows.length; ++i) {
                        temp.push(res.rows.item(i));
                    }
                    console.log(temp, "all goals")
                    this.setState({
                        tasksOfGoal: temp,
                        isSuccess: true, isLoading: false
                    })


                },
                (tx, err) => {
                    this.setState({ isLoading: true, isSuccess: false })
                    console.log(tx)
                })
        })
    }

    changeGoalStatus = (id, status) => {
        this.setState({ isLoading: true, isSuccess: false })
        db.transaction(async tx => {
            await tx.executeSql('update table_goal set goalStatus = ? where id = ?',
                [status, id], (tx, res) => {
                    console.log(res)
                    this.setState({ isLoading: false, isSuccess: false })
                    this.props.navigation.navigate("GoalList", {
                        timeStamp: new Date().getTime(),
                        reloadTab: status == "workingon" ? "completed" : "workingon"
                    })
                },
                (tx, err) => {
                    this.setState({ isLoading: true, isSuccess: false })
                    console.log(tx)
                })
        })
    }

}
