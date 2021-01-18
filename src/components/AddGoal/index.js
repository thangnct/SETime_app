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
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import { get_goal } from '../../actions';

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {

            goalTitle: this.props.goalTitle || "",            
            exprirationDate: this.props.navigation.getParam("exprirationDate"),
            color: this.props.color || "#ffc107",
            describe: this.props.describe || "",
            reward: this.props.reward || "",
            colorAvaiable: [
                { name: "Blue", code: "#007bff" },
                { name: "Gray", code: "#6c757d" },
                { name: "Green", code: "#28a745" },
                { name: "Red", code: "#dc3545" },
                { name: "Orange", code: "#ffc107" },
                { name: "Black", code: "#343a40" },
            ],
            tasks: [],
            isLoading: false,
            isSuccess: false

        }
    }
    componentDidMount() {
        // this.createGoalTable();
    }
    render() {

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
                                    style={styles.title}
                                    onChangeText={text => this.handleChangeInput("goalTitle", text)}
                                    value={this.state.goalTitle}
                                    placeholder="Title"
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
                                                <Text>Finish: </Text>
                                            </View>
                                            <View style={styles.pickerStartEndTime}>
                                                <DatePicker
                                                    style={styles.textinput_Date}
                                                    date={this.state.exprirationDate}
                                                    mode="date"
                                                    confirmBtnText="OK"
                                                    cancelBtnText="Cancel"
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
                                                    onDateChange={(date) => {
                                                        
                                                        this.handleChangeInput("exprirationDate", date)
                                                    }}
                                                />
                                            </View>

                                        </View>

                                    </View>
                                </View>
                                <View style={styles.items}>
                                    <View style={styles.itemsLabel}>
                                        <View style={styles.icon_label}>
                                            <Icon name="bullseye" size={25} color={this.state.color} />
                                        </View>
                                        <View style={styles.text_label}>
                                            <Text style={styles.itemLabelText}>Color</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.itemsInput, { borderBottomColor: "#C4C4C4", borderBottomWidth: 1 }]}>

                                        <Picker
                                            mode="dropdown"
                                            placeholder="Pick color"
                                            // style={{ backgroundColor: "blue", height: 50, borderRadius: 50 }}
                                            selectedValue={this.state.color}
                                            onValueChange={(value) => { this.setState({ color: value }) }}
                                        >
                                            {this.state.colorAvaiable.map(color => {
                                                return <Picker.Item
                                                    label={color.name} value={color.code} />
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
                                            fontSize: 14,
                                            color: "#3E3D3D",
                                            flex: 1
                                        }}
                                        value={this.state.describe}
                                        onChangeText={text => this.handleChangeInput("describe", text)}
                                        multiline={true}
                                        numberOfLines={2}
                                    />
                                </View>
                                {/* <View style={styles.items}>
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
                                </View> */}
                                {/* <View style={styles.items}>
                                    <TextInput
                                        style={{

                                            height: 100,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            borderColor: '#AAAAAA',
                                            borderWidth: 1,
                                            fontSize: 14,
                                            color: "#3E3D3D",
                                            flex: 1
                                        }}
                                        value={this.state.reward}
                                        onChangeText={text => this.handleChangeInput("reward", text)}
                                        multiline={true}
                                        numberOfLines={5}
                                    />
                                </View> */}                                
                            </ScrollView>
                        </View>
                    </View>}



            </SafeAreaView>
        );
    }
    validate = () => {
        if (this.state.goalTitle.length == 0) {
            this.refs.toast.show("Goal title is not null.");
            return false;            
        // } else if (this.state.exprirationDate.length == 0) {
        //     this.refs.toast.show("You must pick end time.");
        //     return false;        
        } else {
            return true;
        }
    }
    handleSaveGoal = () => {
        if (this.validate() === true) {
            let goal = {
                goalId: this.props.goalId,
                goalTitle: this.state.goalTitle,                                
                exprirationDate: this.state.exprirationDate,
                color: this.state.color,
                describe: this.state.describe,
                // reward: this.state.reward,
                goalStatus: this.props.goalStatus || "workingon",
            }

            this.saveGoal(goal);
        }
    }

    saveGoal = (goal) => {
        console.log(goal, "goal");
        try {
            // this.setState({ isLoading: true, isSuccess: false })
            db.transaction(async tx => {
                await tx.executeSql('select * from table_goal where id = ?', [goal.goalId],
                    async (tx, res) => {
                        if (res.rows.length == 0) {
                            await tx.executeSql('INSERT INTO table_goal (goalTitle, color, exprirationDate , describe, reward, goalStatus) VALUES ( ?, ?, ?, ?, ?, ?)',
                                [goal.goalTitle, goal.color, goal.exprirationDate, goal.describe, "", goal.goalStatus], (tx, res) => {
                                    Alert.alert("Saved successfully.")
                                    this.setState({ isLoading: false, isSuccess: true })
                                    let timeStamp = new Date().getTime();
                                    this.props.navigation.navigate("GoalList", {
                                        timeStamp: timeStamp
                                    })
                                },
                                (tx, err) => {
                                    console.log(tx)
                                    Alert.alert("Saved failure.")
                                    this.setState({ isLoading: false, isSuccess: false })
                                    let timeStamp = new Date().getTime();
                                    this.props.navigation.navigate("GoalList", {
                                        timeStamp: timeStamp
                                    })
                                })
                        } else {
                            console.log(goal, ">>>>")
                            await tx.executeSql('update table_goal set goalTitle = ?, color = ?,  exprirationDate = ?, describe = ?, reward = ?, goalStatus = ? where id = ?',
                                [goal.goalTitle, goal.color,  goal.exprirationDate, goal.describe, goal.reward, goal.goalStatus, goal.goalId], (tx, res) => {
                                    // await tx.executeSql('update table_goal set goalTitle = ? where id = ?',
                                    // [goal.goalTitle,  goal.goalId], (tx, res) => {
                                    console.log(res, "res");
                                    Alert.alert("Update successfully.")
                                    this.setState({ isLoading: true, isSuccess: false })
                                    let timeStamp = new Date().getTime();
                                    this.props.navigation.navigate("GoalList", {
                                        timeStamp: timeStamp
                                    })
                                },
                                (tx, err) => {
                                    console.log(tx)
                                    Alert.alert("Saved failure.")
                                    this.setState({ isLoading: false, isSuccess: false })
                                    let timeStamp = new Date().getTime();
                                    this.props.navigation.navigate("GoalList", {
                                        timeStamp: timeStamp
                                    })
                                })
                        }
                    }, (tx, err) => {
                        Alert.alert("Saved failure.")
                        this.setState({ isLoading: false, isSuccess: false })
                        let timeStamp = new Date().getTime();
                        this.props.navigation.navigate("GoalList", {
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
                            'CREATE TABLE IF NOT EXISTS table_goal(id INTEGER PRIMARY KEY AUTOINCREMENT, goalTitle VARCHAR(255), exprirationDate VARCHAR(255), color VARCHAR(255), describe TEXT(100), reward VARCHAR(255), goalStatus VARCHAR(255))',
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
}
