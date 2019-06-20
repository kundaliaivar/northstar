import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Assignee = (props) => {
    const onPress = () => props.fnPressButton();
    // Default value
    const user = {
        name: 'Abhishek P',
        initials: 'AP',
        designation: 'UX Developer',
        location: 'Bellandur'
    };
        AsyncStorage.getItem('userId').then(id => {
            if (!id) {
                return;
            }
            const names = id.split(' ');
            let initials = names.substring(0, 1).toUpperCase();
            
            if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase();
            }
            user.initials = initials;
        });

    return (
        <View style={styles.containerStyles}>
            <Avatar
                size='Small'
                rounded
                title={user.initials}
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
        fontSize: 16,
        color: '#000'
    },
    iconStyle: {
        marginLeft: 'auto'
    }
};

export default Assignee;
