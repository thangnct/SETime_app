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
export default class AddTask extends Component {
    constructor(props) {
        super(props);
        let now = new Date()
        let currentMonth = now.getMonth() + 1; let currentYear = now.getFullYear(); let currentDate = now.getDate();
        let today = "" + currentYear + "-" + (currentMonth.toString().length == 1 ? "0" + currentMonth : currentMonth) + "-" + (currentDate.toString().length == 1 ? "0" + currentDate : currentDate);
        this.state = {
            taskTitle: "",
            note: "",
            goalSupport: this.props.goalId || "",
            isAllDay: true,
            date: today,
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
        // console.log(this.state, "STATE")
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
                                    <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.goBack()}
                                >
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.taskTitleContainer}>
                                <TextInput
                                    style={styles.taskTitle}
                                    onChangeText={text => this.handleChangeInput("taskTitle", text)}
                                    value={this.state.taskTitle}
                                    placeholder="Task tile"
                                />
                            </View>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="bullseye" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>Support for goal </Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemsInput}>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="Pick goal"
                                            style={{ width: undefined }}
                                            selectedValue={this.state.goalSupport}
                                            onValueChange={(value) => {
                                                console.log(value, "pick")
                                                this.setState({
                                                    goalSupport: value,
                                                })
                                            }}
                                        >
                                            {this.state.isLoading == false && this.state.isSuccess && this.state.listGoalWorkingOn ? this.state.listGoalWorkingOn.map(goal => {
                                                console.log(goal)
                                                return <Picker.Item label={goal.goalTitle} value={goal.id} />
                                            }) : null}
                                        </Picker>
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
                                        {/* <View style={styles.allDay}>
                                            <Text style={{ marginRight: 15 }} >All day</Text>
                                            <Switch
                                                value={this.state.isAllDay}
                                                onValueChange={value => {
                                                    this.setState({ isAllDay: value })
                                                }}
                                            />
                                        </View> */}
                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        {/* <View style={styles.icon_label}>
                                            <Icon name="calendar" size={25} color={"#AAAAAA"} />
                                        </View> */}
                                        {/* <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>Time-bound</Text>
                                        </View> */}

                                        <View style={styles.timeStartEnd}>

                                            <View style={styles.pickerStartEndTime}>
                                                <DatePicker
                                                    style={styles.textinput_Date}

                                                    date={this.state.date}
                                                    mode="date"
                                                    confirmBtnText="OK"
                                                    cancelBtnText="Cancel"
                                                    // minDate={this.state.startTime || ""}
                                                    // maxDate={this.state.endTime || ""}
                                                    placeholder="Pick time"
                                                    format="YYYY-MM-DD"
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
                                                        this.handleChangeInput("date", time)
                                                    }}
                                                />
                                            </View>

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
                                            <Text style={styles.itemLabelText}>Note </Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemsInput}>

                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <TextInput
                                        style={{
                                            // multiline: true,
                                            height: 100,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderColor: '#AAAAAA',
                                            borderWidth: 1,
                                            fontSize: 16,
                                            color: "#3E3D3D",
                                            flex: 1
                                        }}
                                        onChangeText={text => this.handleChangeInput("note", text)}
                                        multiline={true}
                                        numberOfLines={5}
                                    />
                                </View>
                                {/* <Text onPress={() => { this.createTaskTable() }}>createTaskTable</Text>
                                <Text onPress={() => { this.getAllGoal("workingon") }}>getAllGoal</Text>
                                <Text onPress={() => { this.dropTaskTable() }}>drop</Text> */}
                                <Text onPress={() => { this.dropTaskTable() }}>drop</Text>
                                <Text onPress={() => { this.getAllTask() }}>getAllTask</Text>
                                <Text onPress={() => { this.createTaskTable() }}>createTaskTable</Text>
                            </ScrollView>



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
            let task = {
                goalId: this.state.goalSupport,
                taskTitle: this.state.taskTitle,
                note: this.state.note,
                isAllDay: this.state.isAllDay,
                date: this.state.date,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                taskStatus: "workingon"
            }
            this.saveTask(task)
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
                            'CREATE TABLE IF NOT EXISTS table_task(id INTEGER PRIMARY KEY AUTOINCREMENT, goalId int FOREIGNKEY REFERENCES table_goal(id), taskTitle VARCHAR(255), note Text(1000), isAllDay bit, date VARCHAR(255), startTime VARCHAR(255), endTime VARCHAR(255), taskStatus VARCHAR(255))',
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
                console.log(res.rows.length, "itme")
                console.log(res, "drop task table")
            }, (tx, err) => {
                console.log(tx)
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
                                [goal.goalTitle, goal.exprirationDate, goal.color, goal.describe, goal.reward, goal.goalStatus, goal.id], (tx, res) => {
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
    deleteGoal = (goalId) => {
        db.transaction(async tx => {
            await tx.executeSql('delete from table_goal where id=?',
                [goalId], (tx, res) => {
                    console.log(res, "delete goal success")
                },
                (tx, err) => { console.log(tx) })
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
