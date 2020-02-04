import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

export default class VerifyPhone extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.confirmation = null;
        this.state = {
            OPTcode: "",
        };

    }
    getCurrentToken = async () => {
        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        // console.log('User JWT: ', idTokenResult.token);
        return idTokenResult.token;
    }
    componentDidMount() {
        //Trigger auth state changed
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user.toJSON(),
                    token: this.getCurrentToken
                });
                console.log("User have been login !");
                this.props.navigation.navigate("App")
                
            } else {
                console.log("User has been signed out !");
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
                            <Text style={styles.loginText}>Verify Phone</Text>
                            <Text style={styles.loginTextUnder}>Send a verification code to verify your phone number: {this.props.navigation.getParam("phone")}</Text>
                        </View>
                        <View style={styles.coverInput}>
                            <Item>

                                <Input
                                    placeholder="OTP code"
                                    keyboardType={'numeric'}
                                    onChangeText={value =>
                                        this.handleChangeInput("OPTcode", value)
                                    }
                                />
                            </Item>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                this.confirmPhone(this.props.navigation.getParam("phone"));
                            }}
                        >
                            <Text style={styles.textRegister}>Resend OTP</Text>
                        </TouchableOpacity>
                        <View style={styles.coverButton}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.verifierAuthCode(this.state.OPTcode)
                                }}
                            >
                                <Text
                                    style={styles.text_Button}>
                                    Verify
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>

                </View>
            </Container>
        );
    }
    verifierAuthCode = async (authCode) => {
        try {
            if (this.confirmation !== null) {
                await this.confirmation.confirm(authCode); // User entered code
                // Successful login - onAuthStateChanged is triggered
            } else {
                Alert.alert("Thông báo", "Vui lòng lấy mã OTP để xác thực !")
            }
        } catch (e) {
            console.error(e); // Invalid code
            Alert.alert("Thông báo", "Có lỗi sảy ra, vui lòng kiểm tra lại.")
        }
    }

    confirmPhone = async (phone) => {
        try {
            this.confirmation = await auth().signInWithPhoneNumber('+84 ' + phone);
        } catch (err) {
            Alert.alert("Thông báo", "Chúng tôi đã chặn tất cả các yêu cầu từ thiết của bạn do phát hiện hoạt động bất thường. Vui lòng thử lại sau.")
        }

    }
    handleChangeInput = (name, value) => {
        this.setState({
            [name]: value
        })
        // console.log("state: ", this.state)
    }
}
