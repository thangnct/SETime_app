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
import GoalListStatus from "../../containers/GoalListStatus"



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
        }

    }
    checkObjectEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length > 0
    }
    async componentWillReceiveProps(nextProps) {
        const { isLoading, isSuccess, dataGetGoal } = nextProps.work
        // console.log("??dadas??: ", dataGetGoal.goals.working_on)
        if (dataGetGoal && dataGetGoal !== this.props.work.dataGetGoal && isLoading == false && isSuccess == true) {
            if (dataGetGoal.code == 1) {
                console.log("dataGetGoal: ", dataGetGoal)
                this.state.goalListCompleted = dataGetGoal.goals.completed;
                this.state.goalListWorkingOn = dataGetGoal.goals.working_on;
                console.log("1234: ", this.state.goalListWorkingOn)
            } else if (dataGetGoal.code == -99) {
                Alert.alert("Notification", "There is a trouble, please try again later.")
            } else {
                Alert.alert("Notification", dataGetGoal.message)
            }
        }
    }

    componentDidMount() {

        this.props.dispatchGetGoal({
            startSkip: 0,
            limit: 10,
            token: this.props.auth.token,
            type: "all"
        })
        // this.props.dispatchGetGoal({
        //     startSkip: 0,
        //     limit: 10,
        //     token: this.props.auth.token,
        //     type: "completed"
        // })
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
                                goalList={this.state.goalListWorkingOn}
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
                                goalList={this.state.goalListCompleted}
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
