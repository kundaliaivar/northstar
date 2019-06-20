import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import EditIcon from '../../../images/edit.png';
import CloseIcon from '../../../images/close.png';

const MemberInfo = (props) => { 
    const {
        goalName,
        date,
        avatarTitle,
        onAction,
        edit
    } = props;
    return (
        <View style={styles.infoContainer}>
            <View style={styles.avatarContainer}>
                <Avatar
                    size='small'
                    rounded
                    title={avatarTitle}
                    onPress={() => console.log('Works!')}
                    activeOpacity={0.7}
                />
            <View style={styles.avatarDetail}>
                 <Text style={styles.goalNameStyle}>{goalName}</Text>
                 <Text style={{ fontSize: 12 }}>{date} </Text>
            </View>
            
            </View>
            <View style={{ alignSelf: 'center'}} >
            {edit ? <TouchableOpacity onPress={() => onAction()}>
                <Image source={CloseIcon} />
            </TouchableOpacity> : <TouchableOpacity onPress={() => onAction()}>
                <Image source={EditIcon} />
            </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = {
    infoContainer: {
     width: '89%',
     justifyContent: 'space-between',
     flexDirection: 'row',
     backgroundColor: '#fff',
     marginTop: 5,
     marginLeft: 20,
     marginRight: 20,
     paddingRight: 5,
     paddingLeft: 5,
     paddingTop: 5,
     paddingBottom: 5,
     borderTopLeftRadius: 5,
     borderTopRightRadius: 5
    },
  
    avatarContainer: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        color: '#ccc',
        alignItems: 'center',
        height: 40,


    },
    avatarDetail: {
        paddingLeft: 10,
    },
     goalNameStyle: {
         fontSize: 16,
         color: '#00afff'
     }
};
export default MemberInfo;
