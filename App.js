/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GoalListing from './src/components/goalListing';
import CreateGoalPage from './src/components/createGoal';
import GoalDetails from './src/components/goalDetail';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

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
  render() {
    return (
      <View style={styles.container}>
        <GoalListing onPress={() => this.props.navigation.navigate('GoalDetails')}></GoalListing>
      </View>
    );
  }
}

const RootStack = createStackNavigator({
    Home: {
      screen: App,
    },
    CreateGoalPage: {
      screen: CreateGoalPage,
    },
    GoalDetails:{
      screen:GoalDetails,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {fontSize: 18},
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#2E2F50',
        },
        title:"Goal Details",
    })
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(RootStack);

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
