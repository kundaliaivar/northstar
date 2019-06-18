/* eslint-disable eol-last */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
            marginLeft: 10,
            marginTop: 5,
            marginBottom: 10,
        }
    });
    
    return (
        <View>
            <Text style={inputContainerStyle.label}>{label}</Text>
            <TextInput
                labelStyle={inputContainerStyle.label}
                value={value}
                multiline={multiline}
                numberOfLines={numberOfLines}
                inputContainerStyle={inputContainerStyle.input}
                placeholder={placeholder}
            />
        </View>
    );
};

export default Input;
