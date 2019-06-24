import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Assignee = (props) => {
    const onPress = () => props.fnPressButton();
    // Default value
        AsyncStorage.getItem('userId').then(id => {
            if (!id) {
                return;
            }
           let user = id;
           
        });

    return (
        <View style={styles.containerStyles}>
            <Avatar
                size='small'
                rounded
                title={user.initials}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
            />
            <View style={styles.nameContainer}>
                <Text style={styles.nameStyle}>{user}</Text>
            </View>
            <Icon
                style={styles.iconStyle}
                name='close'
                size={32}
                color='#fe3365'
                onPress={onPress}
            />
        </View>
    );
};

const styles = {
    containerStyles: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        marginLeft: 10
    },
    nameStyle: {
        fontSize: 16,
        color: '#000'
    },
    iconStyle: {
        marginLeft: 'auto'
    }
};

export default Assignee;
