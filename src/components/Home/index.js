import React, { Component } from "react";
import styles from "./styles";
import {
  Text, View, TouchableOpacity, SafeAreaView,
  ScrollView,
  FlatList, Image, ImageBackground

} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'timesheetApp.db' });

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      months: [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" },
      ],
      years: [],
      currentMonth: "",
      currentYear: "",
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
        { id: "1", taskTitle: "Báo cáo TTTN", timeBound: "09h00 - 12h00", taskStatus: "completed", color: "#3AD713" },
        { id: "2", taskTitle: "Tổng kết tuần, lên kế hoạch cho tuần mới.", timeBound: "14h00 - 16h30", taskStatus: "woking-on", color: "blue" },
        { id: "3", taskTitle: "Tập thể dục, chạy 5km", timeBound: "17h30 - 18h00", taskStatus: "completed", color: "#D7A013" },
        { id: "2", taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "21h30 - 22h30", taskStatus: "woking-on", color: "#D7134E" },
        // { id: "4", taskTitle: "Làm báo cáo TTTN", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#3AD713" },
        // { id: "5", taskTitle: "Đọc cuốn Amazon phát triển thần tốc.", timeBound: "17h30 - 20h30", taskStatus: "woking-on", color: "#D7134E" },
        // { id: "6", taskTitle: "Tập thể dục, chạy 3km", timeBound: "17h30 - 20h30", taskStatus: "completed", color: "#D7A013" },

      ],
      goalInMonth: [
        // { id: "2", title: "Get Link", status: "working-on", color: "#D25656" },
        { id: "3", title: "Đọc xong cuốn Amazon phát triển thần tốc.", status: "completed", color: "#123456" },
        { id: "4", title: "Dậy sớm lúc 5:30", status: "completed", color: "#5277FF" },
        { id: "6", title: "Học nấu ăn.", status: "completed", color: "#123456" },
        { id: "5", title: "Get Link", status: "completed", color: "#3AD713" },
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
  componentWillMount() {
    // const currentYear = new Date().getFullYear();
    // const currentMonth = new Date().getMonth();

    // var years = [];
    // for (let i = currentYear; i < currentYear + 50; i++) {

    //   let year = { label: i, value: i }

    //   years.push(year);
    // }
    // this.state.years = years;
    // console.log("dkalsjdalsd: ", this.state.months[currentMonth - 1])
    // this.state.currentMonth = this.state.months[currentMonth - 1].value;
    // this.state.currentYear = currentYear
    // console.log("full year: ", years)
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
              <Text style={styles.name}>{this.props.auth.fullName}</Text>
              <Text style={styles.phone}>{this.props.auth.phone}</Text>
            </View>
          </View>
          <View style={styles.broad}>

            <View style={styles.goalBroad} >
              <ImageBackground style={{ flex: 1, width: "100%", }}
                source={require("../../../assets/img/gradient.png")}
              >
                <View style={styles.goalBroadTitle}>
                  <Text style={styles.TileGoalBroad}>Workingon Goals</Text>

                </View>
                <View style={styles.goalBroadBody}>
                  <View style={styles.goalList}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={this.state.goalInMonth}
                      renderItem={({ item }) => <TouchableOpacity>
                        <View style={styles.goal}>
                          <View style={styles.leftGoalBroad}>
                            {/* <View style={{ width: 25 }}>
                              <Icon style={styles.goalStatus} name={item.status == "completed" ? "check-square" : "spinner"} color={item.status == "completed" ? "#5277FF" : "white"} size={18} />
                            </View> */}
                            <View>
                              <Text style={styles.goalTitle}>{item.title}</Text>
                            </View>
                          </View>
                          <View style={styles.goalColor}>
                            <Icon name="circle" color={item.color} size={20} />
                          </View>
                        </View>
                      </TouchableOpacity>
                      }
                    />
                  </View>
                  <View style={styles.goalBroadRatioCompleted}>
                    <View style={{ flexDirection: "row", justifyContent:"center", alignItems:"center" }}>
                      <Text style={styles.ratioCompletedText}>30</Text>
                      <Text style={{
                        color: "#FFFFFF",
                        fontSize: 20,
                        fontWeight: "bold",
                        // marginLeft: 20,
                        // textAlign: "left",
                        // marginBottom: 12

                      }}>%</Text>
                    </View>

                  </View>
                </View>

              </ImageBackground>
            </View>
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
              <Text style={styles.dailyTaskTime}>April, 12, 2020</Text>
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
    db.transaction(async tx => {
      await tx.executeSql('INSERT INTO table_goal (goalTitle, exprirationDate, color, describe, reward, goalStatus) VALUES (?, ?, ?, ?, ?, ?)',
        [goal.goalTitle, goal.exprirationDate, goal.color, goal.describe, goal.reward, goal.goalStatus], (tx, res) => {
          console.log(res, "insert goal success")
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

  getAllGoal = () => {
    db.transaction(async tx => {
      await tx.executeSql('INSERT INTO table_goal (goalTitle, exprirationDate, color, describe, reward, goalStatus) VALUES (?, ?, ?, ?, ?, ?)',
        [goal.goalTitle, goal.exprirationDate, goal.color, goal.describe, goal.reward, goal.goalStatus], (tx, res) => {
          console.log(res, "insert goal success")
        },
        (tx, err) => { console.log(tx) })
    })
  }
}
