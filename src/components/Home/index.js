import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
  Text, View, TouchableOpacity, SafeAreaView,
  ScrollView,
  FlatList, Image, ImageBackground

} from "react-native";
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDatetime, getTimeUseTimezone } from "../../commons";
import ActionButton from 'react-native-action-button';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      dayList: [
        { id: "1", dayTitle: "06", weekday: "Mon", day: "monent" },
        { id: "2", dayTitle: "07", weekday: "Tue", day: "monent" },
        { id: "3", dayTitle: "08", weekday: "Wed", day: "monent" },
        { id: "4", dayTitle: "09", weekday: "Thur", day: "monent" },
        { id: "5", dayTitle: "10", weekday: "Fri", day: "monent" },
        { id: "6", dayTitle: "11", weekday: "Sat", day: "monent" },
        { id: "7", dayTitle: "12", weekday: "Sun", day: "monent" },
      ],
      taskListInDay: [
        { id: "1", taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
        { id: "2", taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
        { id: "3", taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },
        { id: "4", taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
        { id: "5", taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
        { id: "6", taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },

      ],
      goalInMonth: [
        { id: "2", title: "Get Link", status: "completed", color: "#D25656" },
        { id: "3", title: "Đọc xong cuốn Amazon phát triển thần tốc.", status: "completed", color: "#123456" },
        { id: "4", title: "Dậy sớm lúc 5:30", status: "completed", color: "#5277FF" },
        { id: "5", title: "Get Link", status: "completed", color: "#3AD713" },
        { id: "6", title: "Đọc xong cuốn Amazon phát triển thần tốc.", status: "completed", color: "#123456" },
        { id: "17", title: "Dậy sớm lúc 5:30", status: "completed", color: "#123456" },
      ],
      monthGoal: [
        {
          id: '1',
          title: 'First Item',
        },
        {
          id: '2',
          title: 'Second Item',
        },
        {
          id: '3',
          title: 'Third Item',
        }
      ]
    }

  }

  render() {

    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header} >
          <View style={styles.top} >
            {/* <TouchableOpacity style={styles.option}
              onPress={() => { this.props.navigation.openDrawer() }}
            >
              <Icon name="align-justify" color="#3E3D3D" size={20} />
            </TouchableOpacity> */}
            <Image source={require("../../../assets/img/man.png")} style={{ width: 45, height: 45 }} />
            <View style={styles.info}>
              <Text style={styles.name}>Victor Nguyen</Text>
              <Text style={styles.phone}>0337896198</Text>
            </View>
          </View>
          <View style={styles.broad}>

            <FlatList
              showsVerticalScrollIndicator={false}
              horizontal={true}
              data={this.state.monthGoal}
              renderItem={({ item }) => <View style={styles.goalBroad} >
                <ImageBackground style={{ flex: 1, width: "100%" }}
                  source={require("../../../assets/img/gradient.png")}
                >
                  <View style={styles.goalBroadTitle}><Text style={styles.TileGoalBroad}>January, 2020</Text></View>
                  <View style={styles.goalBroadBody}>
                    <View style={styles.goalList}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.goalInMonth}
                        renderItem={({ item }) => <View style={styles.goal}>
                          <View style={styles.leftGoalBroad}>
                            <Icon style={styles.goalStatus} name="check-square" color="#5277FF" size={18} />
                            {/* <CheckBox
                                checked={item.taskStatus=="completed"}
                                checkedColor="#F2994A"
                            /> */}
                            <Text style={styles.goalTitle}>{item.title}</Text>
                          </View>
                          <View style={styles.goalColor}>
                            <Icon name="circle" color={item.color} size={20} />
                          </View>
                        </View>}
                      />
                    </View>
                    <View style={styles.goalBroadRatioCompleted}>
                      <Text style={styles.ratioCompletedText}>30%</Text>
                    </View>
                  </View>

                </ImageBackground>
              </View>
              }
              keyExtractor={item => {
                // console.log("xxx: ", item.id)
              }}
            />
          </View>
        </View>
        <View style={styles.body} >
          <View style={styles.daylist} >
            <View style={styles.dayListContainer}>
              <FlatList horizontal={true}
                showsVerticalScrollIndicator={false}
                data={this.state.dayList}
                renderItem={({ item }) => <View style={{ width: 60, height: 60, borderRadius: 5, borderColor: "#F2994A", borderWidth: 3, backgroundColor: "#FFFFFF", marginRight: 5, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.weekday}>{item.weekday}</Text>
                  <Text style={styles.weekday}>{item.dayTitle}</Text>
                </View>}
              />
            </View>


          </View>
          <View style={styles.dailyTask} >
            <View style={styles.dailyTaskHeader} >
              <Text style={styles.dailyTaskTime}>06 Mon, 2020</Text>
              <View style={styles.dailyTaskStatus}>
                <Text style={styles.dailyTaskLabel}>Daily Task</Text>
                <Text style={styles.dailyTaskStatusCompleted}>2 completed - 1 woking on</Text>
              </View>
            </View>
            <View style={styles.taskList} >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.taskListInDay}
                renderItem={({ item }) => <View style={{
                  height: 50, borderRadius: 5, marginLeft: 15,
                  marginRight: 5, flexDirection: "row", justifyContent: "flex-start",
                  alignItems: "center", marginTop: 5
                }}>
                  <Icon name="circle" color={item.color} size={20} />
                  <View style={styles.task}>
                    <Text style={styles.weekday}>{item.taskTitle}</Text>
                    <Text style={styles.timeBound}>{item.timeBound}</Text>
                  </View>
                </View>}
              />
            </View>
          </View>
        </View>

        <ActionButton buttonColor="#F2994A">
          <ActionButton.Item buttonColor='#FFFFFF' title="Add goal" onPress={() => this.props.navigation.navigate("AddGoal")}>
            <Icon name="circle" color="#F2994A" size={20} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#FFFFFF' title="Add task" onPress={() => { this.props.navigation.navigate("AddTask") }}>
            <Icon name="tasks" color="#F2994A" size={20} />
          </ActionButton.Item>
        </ActionButton>

        {/* <Text
          onPress={() => {
            this.signOut()
          }}
        >Đăng xuất</Text> */}
      </SafeAreaView >

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
