import { StyleSheet, Dimensions, StatusBar } from "react-native"
const Width = Dimensions.get('screen').width
const Height = Dimensions.get('screen').height
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  name: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    color: "#000000"
  },
  account: {
    fontSize: 15,
    // fontWeight: "bold",
    color: "#000000"
  },
  logoutButton: {
    height: 50,
    width: 150,
    backgroundColor: "#F2994A",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center"
  },
  copyrightText:{
fontSize: 14,
//  fontWeight: "bold",

  },
  copyrightContainer: {
    flex: 2,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  logoutText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF"
  }
});
export default styles;