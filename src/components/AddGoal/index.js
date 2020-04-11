import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'timesheetApp.db' });
import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    TextInput,
    FlatList,
    ActivityIndicator,
    Alert
} from "react-native";
import Toast, { DURATION } from 'react-native-easy-toast'
import {
    Picker,

} from "native-base";
import moment from "moment";
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
const task = <Icon name="tasks" size={25} color={"#AAAAAA"} />;
export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {

            color: "",
            // taskListInDay: [
            //     { id: 1, taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
            // ],
            describe: "",
            goalTitle: "",
            startTime: "",
            endTime: "",

            colorAvaiable: [
                { name: "Blue", code: "#007bff" },
                { name: "Gray", code: "#6c757d" },
                { name: "Green", code: "#28a745" },
                { name: "Red", code: "#dc3545" },
                { name: "Orange", code: "#ffc107" },
                { name: "Black", code: "#343a40" },                
            ],
            reward: "",
            tasks: [],
            isLoading: false,
            isSuccess: false

        }
    }

    checkObjectEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length > 0
    }
    async componentWillReceiveProps(nextProps) {

        const { isLoading, isSuccess, dataAddGoal } = nextProps.work
        if (this.checkObjectEmpty(dataAddGoal) && dataAddGoal !== this.props.work.dataAddGoal && isLoading == false && isSuccess == true) {
            console.log("dataAddGoal: ", dataAddGoal)
            if (dataAddGoal.code == 1) {
                Alert.alert("Notification", dataAddGoal.message)
                this.props.navigation.goBack();

            } else if (dataAddGoal.code == -99) {
                Alert.alert("Notification", "There is a trouble, please try again later.")
            } else {
                Alert.alert("Notification", dataAddGoal.message)
            }
        }
    }
    render() {

        return (
            <SafeAreaView style={styles.container}>
                {this.props.work.isLoading == true ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
                                <TouchableOpacity onPress={() => { this.handleSaveGoal() }}>
                                    <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.goBack() }}
                                >
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.taskTitleContainer}>
                                <TextInput
                                    style={styles.taskTitle}
                                    onChangeText={text => this.handleChangeInput("goalTitle", text)}
                                    value={this.state.taskTitle}
                                    placeholder="Goal tile"
                                />
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ flex: 1 }}>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="calendar" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>Expiration date</Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemsInput}>

                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <View style={styles.timeStartEndContainer}>
                                        <View style={styles.timeStartEnd}>
                                            <View style={styles.labelStartEndTime}>
                                                <Text>Start: </Text>
                                            </View>
                                            <View style={styles.pickerStartEndTime}>
                                                <DatePicker
                                                    style={styles.textinput_Date}
                                                    date={this.state.startTime}
                                                    mode="datetime"
                                                    confirmBtnText="OK"
                                                    cancelBtnText="Cancel"
                                                    // minDate={this.state.startTime || ""}
                                                    // maxDate={this.state.endTime || ""}
                                                    placeholder="Pick time"
                                                    format="YYYY-MM-DD HH:mm"
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
                                                    onDateChange={(date) => { this.handleChangeInput("startTime", date) }}
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
                                                    mode="datetime"
                                                    confirmBtnText="OK"
                                                    cancelBtnText="Cancel"
                                                    placeholder="Pick time"
                                                    // minDate={this.state.startTime || ""}
                                                    // maxDate={this.state.endTime || ""}
                                                    format="YYYY-MM-DD HH:mm"
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
                                                    onDateChange={(date) => { this.handleChangeInput("endTime", date) }}
                                                />
                                            </View>

                                        </View>

                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="paint-brush" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>Color</Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemsInput}>

                                        <Picker
                                            mode="dropdown"
                                            placeholder="Pick color"
                                            style={{ width: undefined, fontWeight: "bold" }}
                                            selectedValue={this.state.color}
                                            onValueChange={(value) => { this.setState({ color: value }) }}
                                        >
                                            {this.state.colorAvaiable.map(color => {
                                                return <Picker.Item label={color.name} value={color.code} />
                                            })}
                                        </Picker>


                                    </View>
                                </View>


                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="sticky-note" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>Describe </Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemsInput}>

                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <TextInput
                                        style={{

                                            height: 100,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderColor: '#AAAAAA',
                                            borderWidth: 1,
                                            fontSize: 18,
                                            color: "#3E3D3D",
                                            flex: 1
                                        }}
                                        onChangeText={text => this.handleChangeInput("describe", text)}
                                        multiline={true}
                                        numberOfLines={2}
                                    />
                                </View>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="trophy" size={25} color={"#AAAAAA"} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>Reward </Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemsInput}>

                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <TextInput
                                        style={{

                                            height: 50,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderColor: '#AAAAAA',
                                            borderWidth: 1,
                                            fontSize: 18,
                                            color: "#3E3D3D",
                                            flex: 1
                                        }}
                                        onChangeText={text => this.handleChangeInput("reward", text)}
                                        multiline={true}
                                        numberOfLines={5}
                                    />
                                </View>
                                <Text onPress={() => { this.dropGoalTable() }}> drop</Text>
                                <Text onPress={() => { this.createGoalTable() }}> createGoalTable</Text>
                            </ScrollView>
                        </View>
                    </View>}



            </SafeAreaView>
        );
    }
    validate = () => {
        if (this.state.goalTitle.length == 0) {
            this.refs.toast.show("Goal title is not null.");
            return false
        } else if (this.state.startTime.length == 0) {
            this.refs.toast.show("You must pick start time.");
            return false
        } else if (this.state.endTime.length == 0) {
            this.refs.toast.show("You must pick end time.");
            return false
        } else {
            return true
        }
    }
    handleSaveGoal = () => {
        if (this.validate() === true) {
            let goal = {
                goalTitle: this.state.goalTitle,
                color: this.state.color,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                describe: this.state.describe,
                reward: this.state.reward,
                goalStatus: "workingon",
                tasks: this.state.tasks,
            }
            this.insertGoal(goal);
        }

    }
    checkStartEndTime = () => {
        return this.state.endTime > this.state.startTime
    }
    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    createGoalTable = () => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_goal'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_goal', [], function (tx, res) {
                            // Alert.alert(res);
                        });
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_goal(id INTEGER PRIMARY KEY AUTOINCREMENT, goalTitle VARCHAR(255), startTime VARCHAR(255), endTime VARCHAR(255),color VARCHAR(255), describe TEXT(100), reward VARCHAR(255), goalStatus VARCHAR(255))',
                            [], (tx, res) => {
                                console.log(res, "create table goal success")
                            }, (tx, err) => { console.log(tx) }
                        );
                    }
                }
            );
        });
    }
    dropGoalTable = () => {
        db.transaction(async (txn) => {
            await txn.executeSql('DROP TABLE IF EXISTS table_goal', [], function (tx, res) {
                console.log(res, "drop table")
            }, (tx, err) => {
                console.log(tx)
            }
            );
        });
    }

    insertGoal = (goal) => {
        db.transaction(async tx => {
            await tx.executeSql('INSERT INTO table_goal (goalTitle, startTime, endTime, color, describe, reward, goalStatus) VALUES (?, ?, ?, ?, ?, ?,?)',
                [goal.goalTitle, goal.startTime, goal.endTime, goal.color, goal.describe, goal.reward, goal.goalStatus], (tx, res) => {
                    console.log(res, "insert goal success"),
                        Alert.alert("Success")
                    this.props.navigation.navigate("GoalList")
                    this.getAllGoal("all");
                },
                (tx, err) => { console.log(tx) })
        })
    }
    updateGoal = (goal) => {
        db.transaction(async tx => {
            await tx.executeSql('update table_goal set goalTitle = ?, exprirationDate=?, color=? describe=? reward=? goalStatus=? where id = ?',
                [goal.goalTitle, goal.exprirationDate, goal.color, goal.describe, goal.reward, goal.goalStatus, goal.id], (tx, res) => {
                    console.log(res, "update goal success")
                },
                (tx, err) => { console.log(tx) })
        })
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
                        console.log(temp, "all goals")
                        if (goalStatus == "working on") {
                            console.log("????")
                            this.setState({
                                isLoading: false, isSuccess: true,
                                goalListWorkingOn: temp
                            })
                        } else if (goalStatus == "completed") {
                            console.log("????111")
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
