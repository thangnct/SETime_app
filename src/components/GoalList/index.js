import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, SafeAreaView,
    ScrollView,
    FlatList, Dimensions
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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import GoalListStatus from "../../containers/GoalListStatus"



export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            taskList: [
                { id: 1, taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
                { id: 1, taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
                { id: 1, taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "working-on", color: "#D7A013" },
                { id: 1, taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
                { id: 1, taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
                { id: 1, taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },
            ],
            goalList: [
                {
                    tasks: [],
                    _id: "5e587961cff09805c871590e",
                    userId: "5e42551d6dfd5718938bda9b",
                    goalTitle: "Catch Linh",
                    startTime: "17h30 - 20h30",
                    endTime: "17h30 - 20h30",
                    color: "#298711",
                    describe: "Linh là của hiếm, phải cố mà giữ lấy",
                    reward: "Thử đi rồi biết",
                    goalStatus: "working_on",
                    createdAt: "2020-02-28T02:22:25.636Z",
                    updatedAt: "2020-02-28T02:22:25.636Z",
                },
                {
                    tasks: [],
                    _id: "5e587961cff09805c871590e",
                    userId: "5e42551d6dfd5718938bda9b",
                    goalTitle: "Healthy and banance",
                    startTime: "17h30 - 20h30",
                    endTime: "17h30 - 20h30",
                    color: "#F2994A",
                    describe: "Linh là của hiếm, phải cố mà giữ lấy",
                    reward: "Thử đi rồi biết",
                    goalStatus: "working_on",
                    createdAt: "2020-02-28T02:22:25.636Z",
                    updatedAt: "2020-02-28T02:22:25.636Z",
                },
                {
                    tasks: [],
                    _id: "5e587961cff09805c871590e",
                    userId: "5e42551d6dfd5718938bda9b",
                    goalTitle: "Get up early",
                    startTime: "17h30 - 20h30",
                    endTime: "17h30 - 20h30",
                    color: "#5277FF",
                    describe: "Linh là của hiếm, phải cố mà giữ lấy",
                    reward: "Thử đi rồi biết",
                    goalStatus: "working_on",
                    createdAt: "2020-02-28T02:22:25.636Z",
                    updatedAt: "2020-02-28T02:22:25.636Z",
                }

              ],
        }

    }

    render() {

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
                        onChangeTab={({ ref }) =>
                            console.log("lalalla: ", ref.props.heading)
                            // this.tabChanged(ref.props.heading)
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
                                goalList={this.state.goalList}
                                navigation={this.props.navigation}
                            //loading={loading}
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
                                data={this.state.goalList}
                                navigation={this.props.navigation}
                            //loading={loading}
                            />
                        </Tab>

                    </Tabs>

                </View>

            </SafeAreaView>

        );
    }

    renderBroad = () => {
        return <View style={styles.square} />
    }
    signOut = async () => {
        await AsyncStorage.removeItem("token");
        this.props.navigation.navigate("Auth")
    }
}
