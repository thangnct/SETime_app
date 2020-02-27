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
  weekday: {
    fontSize: 14,
    fontWeight: "bold"
  },
  dailyTaskTime: {
    fontSize: 14,
  },
  task: {
    flex: 7
  },
  checkBox: {
    flex: 2
  },
  color: {
    flex: 1
  }

};