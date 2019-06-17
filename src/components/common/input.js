/* eslint-disable eol-last */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Input as TextInput } from 'react-native-elements';

const Input = (props) => {
    const { value, label, multiline, numberOfLines } = props;
    const inputContainerStyle = StyleSheet.create({
        input: {
            borderColor: '#000',
            borderWidth: 1
        },
        label: {
            width: 60,
            height: 17,
            fontSize: 12,
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
        />
    );
};

export default Input;
