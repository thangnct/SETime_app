import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    FlatList, Dimensions,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDatetime, getTimeUseTimezone } from "../../commons";
import ActionButton from 'react-native-action-button';
import DatePicker from 'react-native-datepicker';
import {
    Tabs,
    Tab,
} from "native-base";
import GoalListStatus from "../../containers/GoalListStatus"
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'timesheetApp.db' });


export default class GoalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            goalListWorkingOn: [
                // {
                //     tasks: [],
                //     _id: "5e606e5d38409702596ca907",
                //     userId: "5e5ff70098d84103f8acab2f",
                //     goalTitle: "Đọc xong cuốn Amazon phát triển thần tốc.",
                //     startTime: "2020-03-05 10:13",
                //     endTime: "2020-03-20 10:13",
                //     color: "blue",
                //     describe: "",
                //     reward: "Đọc ",
                //     goalStatus: "completed",
                //     createdAt: "2020-03-05T03:13:33.487Z",
                //     updatedAt: "2020-03-05T03:13:33.487Z",

                // }
            ],
            goalListCompleted: [

            ],
            isLoading: false,
            isSuccess: false
        }

    }

    render() {
        const { isLoading } = this.state;
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.header} >
                    <View style={styles.top} >
                        <View style={styles.info}>
                            <Text style={styles.name}>Goals List</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    {/* <Text onPress={() => { this.createGoalTable() }}>create table</Text>
                    <Text onPress={() => {
                        let goal = {
                            goalTitle: "Đạt 60kg",
                            exprirationDate: "01-06-2020",
                            color: "#123456",
                            describe: "Đạt 60kg trong 2 tháng, có body đẹp.",
                            reward: "Đi phượt, tán gái",
                            goalStatus: "workingon",
                        }
                        console.log(goal, "xxx")
                        this.insertGoal(goal)
                    }}>insertGoal</Text>

                    <Text onPress={() => { this.deleteGoal(3) }}>deleteGoal</Text>
                    <Text onPress={() => { this.updateGoal(7) }}>updateGoal</Text>
                    <Text onPress={() => { this.findGoal() }}>findGoal</Text>
                    <Text onPress={() => { this.getAllGoal("all") }}>getAllGoal</Text> */}
                    <Tabs
                        tabBarUnderlineStyle={{ backgroundColor: "#F2994A" }}
                        locked
                        onChangeTab={({ ref }) => {
                            console.log("lalalla: ", ref.props.heading)
                            if (ref.props.heading == "Working on") {
                                this.getAllGoal("workingon")
                            } else if (ref.props.heading == "Completed") {
                                this.getAllGoal("completed")
                            }
                        }

                        }
                    >
                        <Tab
                            heading="Working on"
                            activeTextStyle={{ textAlign: "center", color: "#F2994A", fontWeight: "bold" }}
                            activeTabStyle={{ backgroundColor: "#FFFFFF" }}
                            tabStyle={{ backgroundColor: "#FFFFFF" }}
                            textStyle={{ color: "#979797", textAlign: "center", fontWeight: "bold" }}
                        >
                            <GoalListStatus
                                goalList={this.state.goalListWorkingOn}
                                navigation={this.props.navigation}
                                isLoading={isLoading}
                            />
                            {/* <Paid //data={dataListOrder} navigation={this.props.navigation} /> */}
                        </Tab>
                        <Tab
                            heading="Completed"
                            activeTextStyle={{ textAlign: "center", color: "#F2994A", fontWeight: "bold" }}
                            activeTabStyle={{ backgroundColor: "#FFFFFF" }}
                            tabStyle={{ backgroundColor: "#FFFFFF" }}
                            textStyle={{ color: "#979797", textAlign: "center", fontWeight: "bold" }}
                        >
                            <GoalListStatus
                                goalList={this.state.goalListCompleted}
                                navigation={this.props.navigation}
                                isLoading={isLoading}
                            />
                        </Tab>

                    </Tabs>

                </View>

                {/* </View>} */}

            </SafeAreaView>

        );
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

    insertGoal = (goal) => {
        console.log(goal, "jldkjaslkdjs")
        db.transaction(async tx => {
            await tx.executeSql('INSERT INTO table_goal (goalTitle, exprirationDate, color, describe, reward, goalStatus) VALUES (?, ?, ?, ?, ?, ?)',
                [goal.goalTitle, goal.exprirationDate, goal.color, goal.describe, goal.reward, goal.goalStatus], (tx, res) => {
                    console.log(res, "insert goal success")
                    this.getAllGoal("all")
                },
                (tx, err) => { console.log(tx) })
        })
    }
    updateGoal = (id) => {
        db.transaction(async tx => {
            // await tx.executeSql('update table_goal set goalTitle = ?, exprirationDate=?, color=? describe=? reward=? goalStatus=? where id = ?',
            //     [goal.goalTitle, goal.exprirationDate, goal.color, goal.describe, goal.reward, goal.goalStatus, goal.id], (tx, res) => {
            await tx.executeSql('update table_goal set goalStatus=? where id = ?',
                ["completed", id], (tx, res) => {
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
                    'select * from table_goal', [], (tx, res) => {
                        let temp = [];
                        for (let i = 0; i < res.rows.length; ++i) {
                            temp.push(res.rows.item(i));
                        }
                        this.setState({ isLoading: false, isSuccess: true })
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
                        if (goalStatus == "workingon") {
                            console.log(temp, "workingon")
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
