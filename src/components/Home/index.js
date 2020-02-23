import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { getDatetime, getTimeUseTimezone } from "../../commons";
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        }
    }
    static navigationOptions = {
        headerMode: null,
    };
    getCurrentToken = async () => {
        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        console.log('User JWT: ', idTokenResult.token);
        return idTokenResult.token;
    }
    componentDidMount() {
        // const user = firebase.auth().currentUser;
        // if (user) {
        //     // console.log("current user: ", user.toJSON())
        // }

        // // Trigger auth state changed
        // this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         this.setState({ user: user.toJSON() });
        //         this.getCurrentToken();
        //     } else {
        //         // User has been signed out, reset the state
        //         this.setState({
        //             user: null,
        //             message: '',
        //             codeInput: '',
        //             phoneNumber: '',
        //             confirmation: null,
        //         });
        //         this.props.navigation.navigate("Auth")
        //     }
        // });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    render() {

        return (
            <Container style={styles.container}>
                <Text>
                    Now: {getDatetime()}Ï
                </Text>
                <Text>
                    Timezone + 7: {getTimeUseTimezone(7)}
                </Text>
                <Text
                    onPress={() => {
                        this.signOut()
                    }}
                >Đăng xuất</Text>
                <Text>Count: {this.state.number}</Text>
                <Text onPress={() => this.setState({ number: this.state.number + 1 })}>Add</Text>
                <Text onPress={() => this.setState({ number: this.state.number - 1 })}>Sub</Text>
            </Container>
        );
    }

    signOut = async () => {
        this.props.navigation.navigate("Auth")
    }
}
