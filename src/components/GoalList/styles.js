import {
  Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');
export default {
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  header: {
    // backgroundColor: "blue",
    height: 60

  },
  body: {
    backgroundColor: "orange",
    flex: 1,

  },
  top: {
    height: 65,
    // backgroundColor: "pink",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"

  },
  info: {
    // backgroundColor: "red",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10

  },
  goalStatus: {
    marginLeft: 5
  },
  leftGoalBroad:
    { flex: 8.5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginRight: 15 }
  ,
  golaColor: {
    flex: 1.5, justifyContent: "center", alignItems: "center"
  },
  goalTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  goal: {
    // height: 25,
    // backgroundColor: "#123456",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  goalBroad: {
    width: width - 40,
    height: height * 0.25,
    borderRadius: 5,
    backgroundColor: "#F2994A",
    marginLeft: 5
  },
  goalBroadTitle: {
    // backgroundColor: "#333333",
    height: 60,
    justifyContent: "center"
  },
  goalBroadBody: {
    // backgroundColor: "#AAAEEE",
    flexDirection: "row",
    flex: 1
  },
  TileGoalBroad: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 5,

  },
  goalList: {
    flex: 5.5,
    marginLeft: 10,
    // backgroundColor: "#555777",
    marginBottom: 15,
    // height: 120
  },
  goalBroadRatioCompleted: {
    flex: 3.5,
    // backgroundColor: "#999111",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 5
  },
  ratioCompletedText: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "bold",
    marginLeft: 20,
    // textAlign: "left",
    marginBottom: 12
  },
  
  name: {
    fontSize: 28,
    fontWeight: "bold"
  },
  phone: {
    fontSize: 14,
    // fontWeight: "600"
  },
  broad: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    flex: 1,
    alignItems: "center",
    // backgroundColor: "red"
  },
  daylist: {
    // backgroundColor: "red",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  dayListContainer: {
    // backgroundColor: "green",
    marginLeft: 35,
    marginRight: 35,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  dailyTask: {
    flex: 1
  },
  dailyTaskLabel: {
    fontSize: 30,
    fontWeight: "bold"
  },
  dailyTaskStatusCompleted:{
    fontSize: 14,
    // fontWeight: "bold"
  },
  weekday: {
    fontSize: 14,
    fontWeight: "bold"
  },
  dailyTaskTime: {
    fontSize: 14,
  },
  dailyTaskStatus: {
    // backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  timeBound: {
    
  },
  task: {
    marginLeft: 12
  },
  dailyTaskHeader: {
    // backgroundColor: "#999999",
    marginLeft: 5,
    marginRight:5,
    height: 60
  },
  taskList: {
    flex: 1,
    // backgroundColor: "blue",
    marginRight: 20,
    marginLeft:20
  },
  option: {
    marginLeft: 5,
    marginRight: 5,
    width: 45,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#d6d7da',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  addButton: {
    position: "absolute",
    bottom: "5%",
    right: 25,
    width: 50,
    height: 50,
    backgroundColor: "#F2994A",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  addGoalButton: {
    position: "absolute",
    bottom: "13%",
    right: 25,

    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"

  },
  addTaskButton: {
    position: "absolute",
    bottom: "21%",
    right: 25,
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"

  },
};