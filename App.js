/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Alert } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GoalListing from './src/components/goalListing';
import CreateGoalPage from './src/components/createGoal';
import GoalDetails from './src/components/goalDetail';
import LoginPage from './src/components/login/login';
import GoalLandingDetail from './src/components/goalLandingDetail';
import firebase from 'react-native-firebase';
import axios from 'axios';

export const user = {userName:'ayush'};

class App extends Component {
  static navigationOptions = ({ navigation }) =>
    ({
      headerTitle: 'Home',
      headerRight: (
        <Icon
          name='add'
          size={36}
          color='#b46bab'
          onPress={() => navigation.navigate('CreateGoalPage')}
        />
      )
    });

  componentWillMount() {
    const { setParams } = this.props.navigation;
    setParams({ websiteURL: this.props.websiteURL });
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('fcmToken:', fcmToken);
        axios.post('http://192.168.1.4:8080/api/registerdevice',{userName:user.userName,deviceId:fcmToken})
        .then(Response=>console.log(Response.data))
        .catch(err=>console.log(err));
           //TODO call API to register device
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    
    axios.post('http://192.168.1.4:8080/api/registerdevice',{userName:user.userName,deviceId:fcmToken})
        .then(Response=>console.log(Response))
        .catch(err=>console.log(err));
    console.log('fcmToken:', fcmToken);
  }

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
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log('onNotification:');

      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        //.setSound('sampleaudio.wav')
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error("our local notification err", err));
    });

    const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
      .setDescription('Demo app description')
    //  .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log('onNotificationOpened:');
      Alert.alert(title, body)
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:');
      Alert.alert(title, body)
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
    return (
      <View style={styles.container}>
        <GoalListing navigation={this.props.navigation} onPress={() => this.props.navigation.navigate('GoalLandingDetail')}></GoalListing>
      </View>
    );
  }
}

const AuthStack = createStackNavigator({
      Login: LoginPage
    });

const RootStack = createStackNavigator({
  Home: {
    screen: App,
  },
  CreateGoalPage: {
    screen: CreateGoalPage,
    navigationOptions: () => ({
      headerTitleStyle: { fontSize: 18 },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#2E2F50',
      },
      title: 'Create Goal',
    })
    },
    GoalLandingDetail: {
      screen: GoalLandingDetail,
      navigationOptions: () => ({
        headerTitleStyle: { fontSize: 18 },
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#424372',
          shadowOpacity: 0,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOffset: { height: 0, width: 0 }
        },
        title: 'Goal Landing Detai',
    })
    },
  GoalDetails: {
    screen: GoalDetails,
    navigationOptions: () => ({
      headerTitleStyle: { fontSize: 18 },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#2E2F50',
      },
      title: 'Goal Details',
    })
  }
},
  {
    initialRouteName: 'Home',
  }
);

// export default createAppContainer(RootStack);
export default createAppContainer(createSwitchNavigator({
    Root: RootStack,
    Auth: AuthStack
},
{
  initialRouteName: 'Auth',
}));

const styles = StyleSheet.create({

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
