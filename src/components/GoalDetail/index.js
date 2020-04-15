import ActionButton from 'react-native-action-button';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'timesheetApp.db' });
import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    TextInput,
    Switch, ActivityIndicator,
    Alert
} from "react-native";
import {
    Picker,
} from "native-base";
import Toast, { DURATION } from 'react-native-easy-toast'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-community/async-storage";
import { FlatList } from 'react-native-gesture-handler';
const task = <Icon name="tasks" size={25} color={"#AAAAAA"} />;
export default class GoalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isLoading: false,
            isSuccess: false,
            goalId: this.props.goalId ? this.props.goalId : 0,
            goalTitle: "",
            tasksOfGoal: []

        }
    }

    componentDidMount() {
        this.taskOfGoal(this.state.goalId);
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
                                <TouchableOpacity onPress={() => this.handleSaveTask()}>
                                    <Text style={styles.saveText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={async () => {
                                        let result = await this.deleteTask(this.props.navigation.getParam("id"));
                                        if (result) {
                                            this.props.navigation.navigate("TaskList")
                                        }
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
                                    }}>{this.props.startTime} - {this.props.endTime}</Text>
                                </View>
                            </View>

                            <ScrollView style={{ flex: 1 }}>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="list" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <FlatList
                                                data={this.state.tasksOfGoal}
                                                renderItem={({ item }) => <TouchableOpacity
                                                    onPress={() => {
                                                        this.props.navigation.navigate("TaskDetail", {
                                                            taskId: item.taskId,
                                                            goalId: item.goalId,                                                            
                                                            taskTitle: item.taskTitle,
                                                            isAllDay: item.isAllDay,
                                                            note: item.note,
                                                            startTime: item.startTime,
                                                            endTime: item.endTime,
                                                            color: item.color,
                                                            goalTitle: item.goalTitle,
                                                            id: item.id
                                                        })
                                                    }}
                                                    style={{ marginBottom: 8 }}>
                                                    <Text style={{ fontSize: 13, fontWeight: "600" }}>{item.taskTitle}</Text>
                                                    <Text style={{ fontSize: 10 }}>{item.isAllDay ? "All day" : item.startTime + "-" + item.endTime}</Text>
                                                    <Text style={{ fontSize: 11, fontWeight: "bold", color: item.taskStatus == "completed" ? "#0088D4" : "#F2994A" }}>{item.taskStatus}</Text>
                                                </TouchableOpacity>}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="sticky-note" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.contentItem}>{this.props.describe}
                                            </Text>
                                            {/* <Text style={styles.itemLabelText}>{this.props.navigation.getParam("note")} </Text> */}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="trophy" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.contentItem}>{this.props.reward}
                                            </Text>
                                            {/* <Text style={styles.itemLabelText}>{this.props.navigation.getParam("note")} </Text> */}
                                        </View>
                                    </View>
                                </View>

                                {/* <View style={styles.items}>
                                    
                                </View> */}
                                {/* <Text onPress={() => { this.createTaskTable() }}>createTaskTable</Text>
                                <Text onPress={() => { this.getAllGoal("workingon") }}>getAllGoal</Text>
                                <Text onPress={() => { this.dropTaskTable() }}>drop</Text> */}
                            </ScrollView>

                            <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.updateTask(this.props.navigation.getParam("id"))
                                    }}
                                    style={{
                                        width: 50, height: 50, backgroundColor: "#F2994A", borderRadius: 50,
                                        justifyContent: "center", alignItems: "center",
                                        // backgroundColor:"red",
                                        bottom: 25, right: 20
                                    }}
                                >
                                    <Icon name={"check"} color="#ffffff" size={20} />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>}

            </SafeAreaView>
        );
    }
    validate = () => {
        console.log(this.state, "valo")
        if (this.state.taskTitle.length == 0) {
            this.refs.toast.show("Task title is not null.");
            return false
        } else if (this.state.goalSupport.length == 0) {
            this.refs.toast.show("You must pick a goal.");
            return false
        } else {
            console.log("kljsdlska")
            return true
        }
    }
    handleSaveTask = () => {
        if (this.validate() === true) {
            // let now = new Date();
            // let date = now.getDate().toString().length == 1 ? "0" + now.getDate() : now.getDate();
            // let m = now.getMonth() + 1;
            // let month = m.toString().length == 1 ? "0" + m : m;
            // let year = now.getFullYear();
            // let today = "" + date + "-" + month + "-" + year;
            let task = {
                goalId: this.state.goalSupport,
                taskTitle: this.state.taskTitle,
                note: this.state.note,
                // isAllDay: this.state.isAllDay == 1 ? today : 0,
                isAllDay: this.state.isAllDay,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                taskStatus: "workingon"
            }
            this.insertTask(task);
        }

    }


    renderTimeBound = () => {
        return <View >
            <View style={styles.items}>
                <View style={styles.itemsLabel}>

                </View>
                <View style={styles.itemsInput}>
                    <View style={styles.timeStartEndContainer}>
                        <View style={styles.timeStartEnd}>
                            <View style={styles.labelStartEndTime}>
                                <Text>Start: </Text>
                            </View>
                            <View style={styles.pickerStartEndTime}>
                                <DatePicker
                                    style={styles.textinput_Date}
                                    date={this.state.startTime}
                                    mode="time"
                                    confirmBtnText="OK"
                                    cancelBtnText="Cancel"
                                    // minDate={this.state.startTime || ""}
                                    // maxDate={this.state.endTime || ""}
                                    placeholder="Pick time"
                                    format="HH:mm"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            height: 20,
                                            borderTopWidth: 0,
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            borderBottomWidth: 0,
                                            marginBottom: 0
                                        },
                                    }}
                                    onDateChange={(time) => {
                                        console.log(time, "time2")
                                        this.handleChangeInput("startTime", time)
                                    }}
                                />
                            </View>

                        </View>
                        <View style={styles.timeStartEnd}>
                            <View style={styles.labelStartEndTime}>
                                <Text>Finish: </Text>
                            </View>
                            <View style={styles.pickerStartEndTime}>
                                <DatePicker
                                    style={styles.textinput_Date}
                                    date={this.state.endTime}
                                    mode="time"
                                    confirmBtnText="OK"
                                    cancelBtnText="Cancel"
                                    placeholder="Pick time"
                                    // minDate={this.state.startTime || ""}
                                    // maxDate={this.state.endTime || ""}
                                    format="LT"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            height: 20,
                                            borderTopWidth: 0,
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            borderBottomWidth: 0,
                                            marginBottom: 0
                                        },
                                    }}
                                    onDateChange={(time) => {
                                        console.log(time, "time")
                                        this.handleChangeInput("endTime", time)
                                    }}
                                />
                            </View>

                        </View>

                    </View>
                </View>
            </View>
        </View>
    }
    checkStartEndTime = () => {
        return this.state.endTime > this.state.startTime
    }
    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    taskOfGoal = (goalId) => {
        this.setState({ isLoading: true, isSuccess: false })
        db.transaction(async tx => {
            // await tx.executeSql('select * from table_goal inner join table_task on table_goal.id = table_task.goalId where table_goal.id = ?',
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

}
