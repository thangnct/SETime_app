import React, { Component } from 'react'
import { Container, Content, Button, Text, View, Form, Item, Label, Input } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageBackground, Image, ScrollView, Platform, StatusBar, Alert } from "react-native";
import styles from "./styles";
import Toast, { DURATION } from 'react-native-easy-toast';
import { CheckBox, Header } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from "react-navigation"
import { TouchableHighlight } from 'react-native-gesture-handler';
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#3852A4"
    }}>
      <StatusBar
        barStyle="light-content"
      />
    </View>
  );
}

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check1: false,
      status: 0,
      visible: false,
      message: null,
      name: "Nguyen Cong Thang",
      account: "0337896918",



    }
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={{ flex: 8, justifyContent: "center", alignItems: "center", }}>
          <Image source={require("../../../assets/img/man.png")} style={{ width: 80, height: 80 }} />
          <View style={{ alignItems: "center" }}>
            <Text style={styles.name}>Victor Nguyen</Text>
            <Text style={styles.account}>0337896198</Text>
            <TouchableHighlight
              style={styles.logoutButton}
              onPress={() => this.handleSignout()}
            >
              <Text style={styles.logoutText}>Signout</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}> Copyright: Nguyễn Công Thắng</Text>
          <Text style={styles.copyrightText}> Version: 1.0.0 </Text>
        </View>
      </View >
    )
  }
  handleSignout = async () => {
    this.props.logoutSystem();
    this.props.navigation.navigate("Auth")
  }
}