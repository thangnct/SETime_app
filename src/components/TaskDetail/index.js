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
        this.setState({
            listGoalWorkingOn: this.getAllGoal("workingon")
        })
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
                                            <Text style={styles.itemLabelText}>{this.props.navigation.getParam("goalTitle")} </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.items}>
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
                                {!this.state.isAllDay ? this.renderTimeBound() : null}

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
    dropTaskTable = () => {
        db.transaction(async (txn) => {
            await txn.executeSql('DROP TABLE IF EXISTS table_task', [], function (tx, res) {
                console.log(res, "drop task table")
            }, (tx, err) => {
                console.log(tx)
            }
            );
        });
    }

    insertTask = (task) => {
        console.log("123")
        db.transaction(async tx => {
            await tx.executeSql('INSERT INTO table_task (goalId, taskTitle, note, isAllDay, startTime, endTime, taskStatus) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [task.goalId, task.taskTitle, task.not, task.isAllDay, task.startTime, task.endTime, task.taskStatus], (tx, res) => {
                    console.log(res, "insert task success"),
                        Alert.alert("Success")
                    this.props.navigation.navigate("TaskList")
                    this.getAllTask("all");
                },
                (tx, err) => { console.log(tx) })
        })
    }
    updateTask = (id) => {
        db.transaction(async tx => {
            await tx.executeSql('update table_task set taskStatus=? where id = ?',
                ["completed", id], (tx, res) => {
                    console.log(res, "update task success")
                    Alert.alert("Success")
                },
                (tx, err) => { console.log(tx) })
        })
    }

    deleteTask = (id) => {
        console.log(id)
        this.setState({ isLoading: true, isSuccess: false })
        db.transaction(async tx => {
            await tx.executeSql('delete from table_task where id=?',
                [id], (tx, res) => {
                    this.setState({ isLoading: false, isSuccess: true })
                    console.log(res, "delete task success");
                    return true
                },
                (tx, err) => {
                    this.setState({ isLoading: false, isSuccess: false })
                    console.log(tx)
                    return false
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

    getAllGoal = (goalStatus) => {
        this.setState({ isLoading: true, isSuccess: false })
        if (goalStatus == "all") {
            db.transaction(async tx => {
                await tx.executeSql(
                    'select * from table_goal where goalStatus = ?', [goalStatus], (tx, res) => {
                        let temp = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            temp.push(res.rows.item(i));
                        }
                        console.log(temp, "all goals")
                        this.setState({
                            isSuccess: true, isLoading: false,

                        })
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
                    'select * from table_goal where goalStatus = ?', [goalStatus], (tx, res) => {
                        let temp = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            temp.push(res.rows.item(i));
                        }
                        if (goalStatus == "workingon") {
                            console.log(temp, "all goals working on")
                            this.setState({
                                isLoading: false, isSuccess: true,
                                listGoalWorkingOn: temp
                            })
                        } else if (goalStatus == "completed") {
                            console.log(temp, "all goals completed")
                            this.setState({
                                isLoading: false, isSuccess: true,
                                listGoalWorkingOn: temp
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
