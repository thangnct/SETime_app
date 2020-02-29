import React, { Component } from "react";
import { Container, } from "native-base";
import styles from "./styles";
import {
    Text, View, TouchableOpacity, Alert,
    ActivityIndicator
} from "react-native";
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

export default class VerifyPhone extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.confirmation = this.props.navigation.getParam("confirmation");
        this.state = {
            OPTcode: "",
            user: null
        };

    }
    checkObjectEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length > 0
    }
    componentWillReceiveProps(nextProps) {

        const { isLoading, isSuccess, dataRegister } = nextProps.auth
        console.log("next props: ", nextProps.auth)
        if (this.checkObjectEmpty(dataRegister) && dataRegister !== this.props.auth.dataRegister && isLoading == false && isSuccess == true) {
            console.log("data register: ", dataRegister)
            if (dataRegister.code == 1) {
                Alert.alert("Notification", dataRegister.message);
                this.props.navigation.navigate("Login");
            } else if (dataRegister.code == -99) {
                Alert.alert("Notification", "There is a trouble, please try again later.")
            } else {
                Alert.alert("Notification", dataRegister.message)
            }
        }

    }
    getCurrentToken = async () => {
        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        console.log('User JWT: ', idTokenResult.token);
        return idTokenResult.token;
    }
    componentDidMount() {
        //Trigger auth state changed
        console.log("componentDidMount working")

        this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {

                var phone = "+84" + this.props.navigation.getParam("phone").slice(1, this.props.navigation.getParam("phone").length);
                if (user.toJSON().phoneNumber == phone) {
                    this.props.dispatchRegister({
                        fullName: this.props.navigation.getParam("fullName"),
                        phoneOrEmail: this.props.navigation.getParam("phone"),
                        password: this.props.navigation.getParam("password")

                    })
                    //Signout current user
                    await firebase.auth().signOut();
                }

            } else {
                console.log("user has been logout.")
            }
        });
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }
    render() {
        return (

            <View style={styles.container}>
                {this.props.auth.isLoading == true ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#C4C4C4" />
                </View> :
                    <View style={{ flex: 1 }}>
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
                    </View>
                }

            </View>
        );
    }
    verifierAuthCode = async (authCode) => {
        try {
            if (this.confirmation !== null) {
                this.confirmation.confirm(authCode).then(result => {
                    // User entered code
                    // Successful login - onAuthStateChanged is triggered
                }).catch(err => {
                    Alert.alert("Thông báo", "Xác thực không thành công, vui lòng thử lại với mã OTP mới ! ")
                });
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
            this.confirmation = await auth().signInWithPhoneNumber(phone);
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
