import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as ReactButton } from 'react-native-elements';

const Button = (props) => {
    const { title, style } = props;
    // Styles for the Title text
    const titleStyle = {
        color: style.type === 'clear' ? style.color : '#fff',
        textTransform: 'uppercase'
    };
    // Styles for the Button element
    const buttonStyle = {
        backgroundColor: style.type === 'solid' ? style.color : '#fff',
        height: 50,
    };
    // Styles for the container
    const containerStyle = StyleSheet.create({
        view: {
            alignSelf: 'center',
            margin: 5,
            width: '90%',
        }
    });
    return (
        <View style={containerStyle.view}>
            <ReactButton
                title={title}
                titleStyle={titleStyle}
                buttonStyle={buttonStyle}
                type={style.type}
            />
        </View>
    );
};

export default Button;
