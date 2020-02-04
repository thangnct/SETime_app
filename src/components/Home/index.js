import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { getDatetime, getTimeUseTimezone } from "../../commons";
export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        headerMode: null,
    };

    componentDidMount() {
        const user = firebase.auth().currentUser;
        if (user) {
            // console.log("current user: ", user.toJSON())
        }


        // Trigger auth state changed
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '',
                    confirmation: null,
                });
                this.props.navigation.navigate("Auth")
            }
        });
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
            </Container>
        );
    }

    signOut = async () => {
        firebase.auth().signOut(); Ï
        this.props.navigation.navigate("Auth")
    }
}
