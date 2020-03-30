import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, Alert, KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.confirmation = null;
        this.state = {
            phoneNumber: "",
            password: ""
        };

    }
    checkObjectEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length > 0
    }
    async componentWillReceiveProps(nextProps) {
        const { isLoading, isSuccess, dataLogin } = nextProps.auth
        if (this.checkObjectEmpty(dataLogin) && dataLogin !== this.props.auth.dataLogin && isLoading == false && isSuccess == true) {
            if (dataLogin.code == 1) {
                Alert.alert("Notification", dataLogin.message)
                this.props.navigation.navigate("Loading");
            } else if (dataLogin.code == -99) {
                Alert.alert("Notification", "There is a trouble, please try again later.")
            } else {
                Alert.alert("Notification", dataLogin.message)
            }
        }
    }
    render() {
        const { isLoading, isSuccess } = this.props.auth;
        return (

            <KeyboardAvoidingView behavior="height" enabled style={styles.container}>
                {isLoading == true && isSuccess == true ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#C4C4C4" />
                </View> : <View style={{ flex: 1 }}>
                        <View style={styles.top}>

                        </View>
                        <View style={styles.body}>

                            <View style={styles.formLogin}>
                                <View style={styles.coverTile}>
                                    <Text style={styles.loginText}>Login</Text>
                                    <Text style={styles.loginTextUnder}>Please login to continue</Text>
                                </View>
                                <View style={styles.coverInput}>
                                    <Item>
                                        <Icon
                                            name="phone"
                                        />

                                        <Input
                                            placeholder="Phone"
                                            value={this.state.phoneNumber}
                                            keyboardType={'numeric'}
                                            onChangeText={value =>
                                                this.handleChangeInput("phoneNumber", value)
                                            }
                                        />
                                    </Item>
                                    <Item>
                                        <Icon
                                            name="key"
                                        />

                                        <Input
                                            // secureTextEntry={true}
                                            secureTextEntry={true}
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChangeText={value =>
                                                this.handleChangeInput("password", value)
                                            }
                                        />
                                    </Item>
                                </View>

                                <View style={styles.coverButton}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={this.handleLogin}
                                    >
                                        <Text
                                            style={styles.text_Button}>
                                            Login
                </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.textFooter}>
                                Don't have a account ?{" "}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.props.navigation.navigate("Register");
                                }}
                            >
                                <Text style={styles.textRegister}>Register now</Text>
                            </TouchableOpacity>
                        </View>

                    </View>}

            </KeyboardAvoidingView>
        );
    }

    handleLogin = () => {
        this.props.dispatchLogin({
            account: this.state.phoneNumber,
            password: this.state.password
        })
    }
    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
    }
}
