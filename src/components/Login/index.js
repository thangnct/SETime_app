import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.confirmation = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '',

        };

    }



    confirmPhone = async (phone) => {
        this.confirmation = await auth().signInWithPhoneNumber('+84 ' + phone);
        if (!this.confirmation) {
            Alert.alert("Thông báo", "Chúng tôi đã chặn tất cả các yêu cầu từ thiết của bạn do phát hiện hoạt động bất thường. Vui lòng thử lại sau.")
        }
    }

    verifierAuthCode = async (authCode) => {
        try {
            await this.confirmation.confirm(authCode); // User entered code
            // Successful login - onAuthStateChanged is triggered
        } catch (e) {
            console.error(e); // Invalid code
        }
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("login success =========== : ", user);
                this.setState({ user: user.toJSON() });
                console.log("USERhiih", this.state.user)
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '',
                    confirmation: null,
                });
            }
        });
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }
    render() {
        return (

            <Container style={styles.container}>
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
                                    placeholder="codeInput"
                                    value={this.state.codeInput}
                                    keyboardType={'numeric'}
                                    onChangeText={value =>
                                        this.handleChangeInput("codeInput", value)
                                    }
                                />
                            </Item>
                        </View>
                        <View style={styles.coverButton}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // this.props.navigation.navigate("App");
                                    this.confirmPhone(this.state.phoneNumber)
                                }}
                            >
                                <Text
                                    style={styles.text_Button}>
                                    OTP
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.coverButton}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // this.props.navigation.navigate("App");
                                    this.verifierAuthCode(this.state.codeInput)
                                }}
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

            </Container>


        );

    }

    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
        console.log("state: ", this.state)
    }
}
