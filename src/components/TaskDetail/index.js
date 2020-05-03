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
const task = <Icon name="tasks" size={25} color={"#AAAAAA"} />;
export default class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskTitle: "",
            note: "",
            goalSupport: "",
            isAllDay: true,
            startTime: "",
            endTime: "",
            previousScreen: "",
            listGoalWorkingOn: [],
            isLoading: false,
            isSuccess: false
        }
    }

    componentDidMount() {
        // this.setState({
        //     listGoalWorkingOn: this.getAllGoal("workingon")
        // })
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
                                    this.props.navigation.navigate("")
                                }}>
                                    <Text style={styles.saveText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={async () => {
                                        this.deleteTask(this.props.navigation.getParam("id"));
                                    }}
                                >
                                    <Text style={styles.cancelText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.taskTitleContainer}>
                                <Text style={styles.taskTitle}>{this.props.navigation.getParam("taskTitle")}</Text>
                                <Text style={{}}>{this.props.navigation.getParam("startTime")}-{this.props.navigation.getParam("startTime")}</Text>
                            </View>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="bullseye" size={25} color={this.props.navigation.getParam("color")} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={{ fontSize: 16 }}>{this.props.navigation.getParam("goalTitle")} </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="calendar" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>Time-bound</Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemsInput}>
                                        <View style={styles.allDay}>
                                            <Text style={{ marginRight: 15 }} >All day</Text>
                                            <Switch
                                                value={this.state.isAllDay}
                                                onValueChange={value => {
                                                    this.setState({ isAllDay: value })
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                {!this.state.isAllDay ? this.renderTimeBound() : null} */}

                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="sticky-note" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>{this.props.navigation.getParam("note")} </Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <Text onPress={() => { this.createTaskTable() }}>createTaskTable</Text>                                
                                <Text onPress={() => { this.dropTaskTable() }}>drop</Text> */}
                            </ScrollView>

                            <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        let task = {
                                            id: this.props.navigation.getParam("id")
                                        }
                                        this.saveTask(task)
                                    }}
                                    style={{
                                        width: 50, height: 50, backgroundColor: "#F2994A", borderRadius: 50,
                                        justifyContent: "center", alignItems: "center",
                                        // backgroundColor:"red",
                                        bottom: 25, right: 20
                                    }}
                                >
                                    <Icon name={this.props.navigation.getParam("taskStatus") == "workingon" ? "check" : "undo"} color="#ffffff" size={20} />
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


    createTaskTable = () => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_task'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_task', [], function (tx, res) {
                            // Alert.alert(res);
                        });
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_task(id INTEGER PRIMARY KEY AUTOINCREMENT, goalId int FOREIGNKEY REFERENCES table_goal(id), taskTitle VARCHAR(255), note Text(1000), isAllDay bit, startTime VARCHAR(255), endTime VARCHAR(255), taskStatus VARCHAR(255))',
                            [], (tx, res) => {
                                console.log(res, "create table task success")
                            }, (tx, err) => { console.log(tx) }
                        );
                    }
                }
            );
        });
    }
    saveTask = (task) => {
        console.log(task, "???? task");
        try {
            this.setState({ isLoading: true, isSuccess: false })
            db.transaction(async tx => {
                await tx.executeSql('select * from table_task where id = ?', [task.id],
                    async (tx, res) => {
                        if (res.rows.length == 0) {
                            await tx.executeSql('INSERT INTO table_task (goalId, taskTitle, note, isAllDay, date, startTime, endTime, taskStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                                [task.goalId, task.taskTitle, task.note, task.isAllDay ? 1 : 0, task.date, task.startTime, task.endTime, task.taskStatus], (tx, res) => {
                                    console.log(res, "insert task success");
                                    Alert.alert("Saved successfully.")
                                    this.setState({ isLoading: true, isSuccess: false })
                                    let timeStamp = new Date().getTime();
                                    this.props.navigation.navigate("TaskList", {
                                        timeStamp: timeStamp
                                    })
                                },
                                (tx, err) => {
                                    console.log(tx)
                                    Alert.alert("Saved failure.")
                                    this.setState({ isLoading: false, isSuccess: false })
                                    let timeStamp = new Date().getTime();
                                    this.props.navigation.navigate("TaskList", {
                                        timeStamp: timeStamp
                                    })
                                })
                        } else {
                            await tx.executeSql('update table_goal set goalTitle = ?, exprirationDate=?, color=? describe=? reward=? goalStatus=? where id = ?',
                                [task.goalTitle, task.exprirationDate, task.color, task.describe, task.reward, task.goalStatus, task.id], (tx, res) => {
                                    console.log(res, "insert task success");
                                    Alert.alert("Update successfully.")
                                    this.setState({ isLoading: true, isSuccess: false })
                                    let timeStamp = new Date().getTime();
                                    this.props.navigation.navigate("TaskList", {
                                        timeStamp: timeStamp
                                    })
                                },
                                (tx, err) => {
                                    Alert.alert("Saved failure.")
                                    this.setState({ isLoading: false, isSuccess: false })
                                    let timeStamp = new Date().getTime();
                                    this.props.navigation.navigate("TaskList", {
                                        timeStamp: timeStamp
                                    })
                                })
                        }
                    }, (tx, err) => {
                        Alert.alert("Saved failure.")
                        this.setState({ isLoading: false, isSuccess: false })
                        let timeStamp = new Date().getTime();
                        this.props.navigation.navigate("TaskList", {
                            timeStamp: timeStamp
                        })
                    })
            })
        } catch (err) {
            this.setState({ isLoading: false, isSuccess: false })
            console.log(err, "err")
            Alert.alert("Notification", "An error occurred please check again.")
        }
    }
    deleteTask = (id) => {
        console.log(id)
        this.setState({ isLoading: true, isSuccess: false })
        db.transaction(async tx => {
            await tx.executeSql('delete from table_task where id=?',
                [id], (tx, res) => {
                    this.setState({ isLoading: false, isSuccess: true })
                    console.log(res, "delete task success");
                    Alert.alert("Delete task success")
                    let timeStamp = new Date().getTime();
                    this.props.navigation.navigate("TaskList", {
                        timeStamp: timeStamp
                    })
                },
                (tx, err) => {
                    this.setState({ isLoading: false, isSuccess: false })
                    console.log(tx)
                    Alert.alert("Delete task fail")
                    let timeStamp = new Date().getTime();
                    this.props.navigation.navigate("TaskList", {
                        timeStamp: timeStamp
                    })
                })
        })
    }
    findGoal = (goalId) => {
        db.transaction(async tx => {
            await tx.executeSql('select * from table_goal where id=?',
                [goalId], (tx, res) => {
                    console.log(rres.rows.item(0), "goal ")
                },
                (tx, err) => { console.log(tx) })
        })
    }

    getAllTask = (goalStatus) => {
        this.setState({ isLoading: true, isSuccess: false })
        if (goalStatus == "all") {
            db.transaction(async tx => {
                await tx.executeSql(
                    'select * from table_task', [], (tx, res) => {
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
                    'select * from table_task where taskStatus = ?', [goalStatus], (tx, res) => {
                        let temp = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            temp.push(res.rows.item(i));
                        }
                        console.log(temp, "all task")
                        if (goalStatus == "working on") {
                            this.setState({
                                isLoading: false, isSuccess: true,
                                goalListWorkingOn: temp
                            })
                        } else if (goalStatus == "completed") {
                            this.setState({
                                isLoading: false, isSuccess: true,
                                goalListCompleted: temp
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
