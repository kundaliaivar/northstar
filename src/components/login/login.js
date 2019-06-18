/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import Button from '../common/button';
import Input from '../common/input';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    checkAuth = () => {
        axios.post('http://127.0.0.1:8080/api/login', {
            userName: this.state.username,
            password: this.state.password
        })
        .then(res => {
            if (res.data) {
                this.props.navigation.navigate('Root'); 
            }  
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    render() {
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
        return (
            <View style={styles.center}>
                <View style={styles.loginWrapper}>
                    <Text style={styles.header}>Login</Text>
                    <Input 
                        style={styles.inputBox}
                        // label="Username"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={username => this.setState({ username })}
                    />
                    <Input
                        // label="Password"
                        value={this.state.password}
                        password
                        placeholder="Password"
                        onChange={password => this.setState({ password })}
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
