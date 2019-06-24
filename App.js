/* eslint-disable max-len */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GoalListing from './src/components/goalListing';
import CreateGoalPage from './src/components/createGoal';
import GoalDetails from './src/components/goalDetail';
import LoginPage from './src/components/login/login';
import GoalLandingDetail from './src/components/goalLandingDetail';

export const user = { userName: 'ayush' };

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
        <GoalListing navigation={this.props.navigation} />
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
        // title: 'Create Goal',
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
    })
    },
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
