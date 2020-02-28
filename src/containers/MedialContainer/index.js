import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import Medial from "../../components/Medial";
import { connect } from "react-redux";
import { updateFirebaseID, ShowModal3, handleGetData } from "../../actions"
import firebase from 'react-native-firebase';
import { AsyncStorage, Alert } from 'react-native';
import { getDatetime, generateMD5WithToken } from "../../utils/common";
class MedialContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.notificationListener;
    this.notificationOpenedListener;
    this.checkPermission();
  }
  async componentDidMount() {
    // this.checkPermission();
    await this.createNotificationListeners(); //add this line
  }
  componentWillReceiveProps(props) {
    // console.log('cccccccccccc 3')
    const { login } = props
    // console.log("login: ", login);
    if (Object.getOwnPropertyNames(login.dataUpdateFirebaseID).length > 0) {
      if (login.dataUpdateFirebaseID.c == 1) {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("Error");
      }
    } else {
      this.props.navigation.navigate("Home");
    }
  }
  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        // console.log('new fcmToken :', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    // console.log('fcmToken final:', fcmToken);
    // ============================
    const login = this.props.login
    // console.log("login data: ", login);
    const { token, cus_id } = login
    const datetime = getDatetime();
    const sign = generateMD5WithToken(token, "update_firebase_id");
    this.props.onUpdateFirebaseID({
      datetime,
      sign,
      cus_id: cus_id,
      cus_token: token,
      firebase_id: fcmToken
    })
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    // console.log('ddddddddddddddddd 4')
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body, data } = notification;
      
      this.props.handleGetData(data)
      const localNotification = new firebase.notifications.Notification({
        // sound: 'sampleaudio',
        show_in_foreground: true,
      })
        // .setSound('sampleaudio.wav')
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
        // .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#330066') // you can set a color here
        .android.setAutoCancel(true) // hide notifycation
        .android.setPriority(firebase.notifications.Android.Priority.High);
      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });

    const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
    // .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body, data } = notificationOpen.notification;

      this.props.navigation.navigate("Home");
      // this.props.handleGetData(data)
      setTimeout(() => { this.props.Show() }, 100)
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      // console.log('getInitialNotification:', title, body);
      // console.log('bbb',notificationOpen)
      this.props.handleGetData(data)
      setTimeout(() => { this.props.Show() }, 100)
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log("JSON.stringify:", JSON.stringify(message));
    });
  }
  render() {
    // console.log('tu',this.props.auth)
    return (
      <Medial
        navigation={this.props.navigation}
        auth={this.props.auth}
        login={this.props.login}
      />
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  auth: state.auth
});
const mapDispatchToProps = dispatch => ({
  onUpdateFirebaseID: (data) => dispatch(updateFirebaseID(data)),
  handleGetData: (data) => dispatch(handleGetData(data)),
  Show: () => dispatch(ShowModal3()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedialContainer);
