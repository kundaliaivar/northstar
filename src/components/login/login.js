/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../common/button';
import Input from '../common/input';


class LoginPage extends Component {
    render() {
        const { username, password, navigation } = this.props;
        const styles = {
            buttonStyle: {
                color: '#424372',
                type: 'solid'
            },
            center: {
                color: '#424372',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
                fontSize: 16
            },
            header: {
                color: '#424372',
                fontSize: 26
            },
            inputBox: {
                borderTop: 'none'
            }
            
        };

        // eslint-disable-next-line no-undef
        return (
            <View style={styles.center}>
                <Text style={styles.header}>Login</Text>
                <Input 
                    style={styles.inputBox}
                    label="Username"
                    value={username}
                    placeholder="Username"
                    
                />
                <Input
                    label="Password"
                    value={password}
                    password
                    placeholder="Password"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('Root')}
                    title='Login'
                    style={styles.buttonStyle}
                />
            </View>
        );
    }
}

export default LoginPage;
