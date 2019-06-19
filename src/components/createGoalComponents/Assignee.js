import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { user } from '../../../App'; 

const Assignee = (props) => {
    const onPress = () => props.fnPressButton()
    if (!user.name) {
        // NOTE: remove later
        user.name = 'Abhishek P';
        user.designation = 'UX Developer';
        user.location = 'Bellandur';
    }
    const userInitials = () => {
        const names = user.name.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };
    changeParentState = () =>  {
        this.props.changeState;
      }

    return (
        <View style={styles.containerStyles}>
            <Avatar
                size='large'
                rounded
                title={userInitials()}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
            />
            <View style={styles.nameContainer}>
                <Text style={styles.nameStyle}>{user.name}</Text>
                <Text style={styles.smallText}>{user.designation}</Text>
                <Text style={styles.smallText}>{user.location}</Text>
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
        fontSize: 22,
        color: '#000'
    },
    iconStyle: {
        marginLeft: 'auto'
    }
};

export default Assignee;
