/* eslint-disable eol-last */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Input as TextInput } from 'react-native-elements';

const Input = (props) => {
    const { value, label, multiline, numberOfLines, placeholder, password, style } = props;
    const inputContainerStyle = StyleSheet.create({
        input: {
            borderColor: '#000',
            borderWidth: 1,
            padding: 5,
            marginBottom: 10
        },
        label: {
            // height: 20,
            fontSize: 16,
            paddingTop: 5,
            paddingBottom: 5, 
            letterSpacing: -0.3,
            color: '#aaaaaa'
        }
    });
    
    return (
        <TextInput
            label={label}
            labelStyle={inputContainerStyle.label}
            value={value}
            multiline={multiline}
            numberOfLines={numberOfLines}
            inputContainerStyle={inputContainerStyle.input}
            placeholder={placeholder}
            secureTextEntry={password}
            style={style}
        />
    );
};

export default Input;
