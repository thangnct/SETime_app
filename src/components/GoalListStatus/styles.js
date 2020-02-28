import {
  Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');
export default {
  container: {
    flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 20,
    // backgroundColor: "red"
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  ratioStatus: {
    fontWeight: "bold",
    fontSize:12
  },
  timeBound: {
    fontSize: 12,
    // fontWeight: "bold"
  },
  dailyTaskTime: {
    fontSize: 14,
  },
  ratioButton: {


    width: 65,
    height: 40,
    backgroundColor: "#F2C94C",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  ratioText: {
    fontSize: 15, fontWeight: "bold",
    color: "white"
  },
  goal: {
    flex: 7.5,
    // alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
    // marginRight: 5,
    marginLeft: 20
  },
  checkBox: {
    flex: 1.2,
    // width: 50,
    // backgroundColor: "red",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ratioCompleted: {
    flex: 2.5,
    // backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }

};