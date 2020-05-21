import React, { Component } from "react";
import styles from "./styles";
import {
    Text, View, SafeAreaView,
} from "react-native";
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
            ],
            goalListCompleted: [

            ],
            isLoading: false,
            isSuccess: false,
            timeStamp: 0
        }

    }
    componentDidMount() {
        this.createGoalTable();
    }
    componentDidUpdate(prevProps, prevState) {
        let propsTimeStamp = this.props.navigation.getParam("timeStamp") ? this.props.navigation.getParam("timeStamp") : 0        
        let reloadTab = this.props.navigation.getParam("reloadTab");        
        if (propsTimeStamp != this.state.timeStamp) {
            this.setState({ timeStamp: propsTimeStamp })
            this.getAllGoal(reloadTab)
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
