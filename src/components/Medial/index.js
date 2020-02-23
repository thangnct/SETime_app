import React, { Component } from "react";
import { Image, StatusBar, ActivityIndicator } from "react-native";
import { Container, Text, View } from "native-base";
import styles from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
const logo = require("../../../assets/logo.png");

export default class Loading extends Component {
  render() {
    console.disableYellowBox = true
    return (
      <Container style={styles.container}>
        <Spinner visible={true}/>
      </Container>
    );
  }
}
