/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../common/button';
import Input from '../common/input';
import axios from 'axios';

class LoginPage extends Component {

    checkAuth = () => {
        axios.post('http://127.0.0.1:8080/api/login', {
            userName: this.props.username,
            password: this.props.password
        })
        .then(res => {
            console.log(res);
            this.props.navigation.navigate('Root'); 
        })
        .catch(err => {
            console.log(err);
        });
    };
    
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
                // alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
                fontSize: 16
            },
            loginWrapper: {
                borderWidth: 1,
                borderColor: '#424372',
                padding: 15
            },
            header: {
                color: '#424372',
                fontSize: 26,
                textAlign: 'center'
            },
            inputBox: {
                borderBottomWidth: 1,
                borderColor: '#000' 
            }
            
        };
        // eslint-disable-next-line no-undef
        return (
            <View style={styles.center}>
                <View style={styles.loginWrapper}>
                    <Text style={styles.header}>Login</Text>
                    <Input 
                        style={styles.inputBox}
                        // label="Username"
                        value={username}
                        placeholder="Username"
                        
                    />
                    <Input
                        // label="Password"
                        value={password}
                        password
                        placeholder="Password"
                    />
                    <Button
                        onPress={this.checkAuth}
                        title='Login'
                        style={styles.buttonStyle}
                    />
                </View>
            </View>
        );
    }
}

export default LoginPage;
