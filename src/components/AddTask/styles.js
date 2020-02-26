export default {
  container: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    // backgroundColor: "red"
  },
  top: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    width: 60, height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  taskOption: {
    width: 150,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"

  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50
  },
  saveText: {
    color: "#F2994A",
    fontSize: 18,
    fontWeight: "700"
  },
  cancelText: {
    color: "#AAAAAA",
    fontSize: 18,
    fontWeight: "700"
  },
  body: {
    marginTop: 10,
    flex: 1,
    // backgroundColor: "blue"
  },
  taskTitleContainer: {

  },
  goalSupportContainer: {
    marginTop: 20,
    flexDirection:"row",
    justifyContent: "space-between",
    
    // backgroundColor: "pink"

  },
  goalSupportText: {
    fontSize: 14,
    // fontWeight: "600",
    color: "#3E3D3D",
    marginLeft: 5
  },
  goalSupportLabel:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor:"red",
    flex:4
  },
  goalSupportInput:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"blue",
    flex:6
  },
  taskTitle: {
    multiline: true,
    height: 50,
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#3E3D3D"
  }
};
