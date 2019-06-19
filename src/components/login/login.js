/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import axios from 'axios';
import Button from '../common/button';
import Input from '../common/input';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isValidText: true,
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

    validate(text, type) {
        // const unameReg = /^[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const unameReg = /^[A-Za-z0-9]+$/;
        if (type === 'username') {
            console.warn('yes type is username');
            if (unameReg.test(text)) {
                console.log('valid username:', text);
                this.setState({ isValidText: true });
                this.setState({ username: text });
            } else {
                this.setState({ isValidText: false });
                console.log('Invalid username');
            }
        } else if (type === 'password' && text !== '') {
            console.log('pwd:', text);
            this.setState({ password: text });
        }
    }
    
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
                height: 35,
                borderWidth: 1,
                borderBottomColor: '#424372',
                borderTopColor: '#eee',
                borderLeftColor: '#eee',
                borderRightColor: '#eee',
                width: '90%',
                alignSelf: 'center',
                margin: 20,
                lineHeight: 30
            },
            inputText: {
                fontSize: 16,
                padding: 5,
                color: '#424372'
            },
            error: {
                borderWidth: 1,
                borderColor: 'red'
            }
            
        };
        return (
            <View style={styles.center}>
                <View style={styles.loginWrapper}>
                    <Text style={styles.header}>Login</Text>
                    <View style={styles.inputBox}>
                        <TextInput 
                            style={[styles.inputText, !this.state.isValidText ? styles.error : null]}
                            placeholder="Username"
                            onChangeText={(username) => this.validate(username, 'username')}
                        />
                    </View>
                    
                    <View style={styles.inputBox}>
                        <TextInput 
                            style={styles.inputText}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={(password) => this.validate(password, 'password')}
                        />
                    </View>
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
