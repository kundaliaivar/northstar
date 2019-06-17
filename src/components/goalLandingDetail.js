import React from 'react';
import { Text, View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import EditIcon from '../../images/edit.png';
import AddIcon from '../../images/add2x.png';
import MemberInfo from '../components/common/memberInfo';


const GoalLandingDetail = () => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <Text>Test</Text>
                <View style={styles.editSectionStyle}>
                    <Text style={{ color: 'aqua' }}>View Details</Text>
                    <Image source={EditIcon} />
                </View>
            </View>
            <View style={styles.progressSection}>
                <Text>progress bar to be placed</Text>
                <View >
                    <Text style={styles.completionDateHeader}>Completed By</Text>
                    <Text style={styles.completionDateContainer}>june 13</Text>
                </View>
            </View>
            <View style={styles.addMemberSec}>
                <Avatar
                    size='small'
                    rounded
                    style={{ height: 30, width: 30 }}
                    title='MT'
                    onPress={() => console.log('Works!')}
                    activeOpacity={0.7}
                />
                <Image style={styles.addMemberStyle} source={AddIcon} />
            </View>
            <View style={styles.upadatePostSec}>
                <Text>Post an update...</Text>
                <Image source={EditIcon} />
            </View>
            <View>
                <MemberInfo goalName ='Sherill veez' date='14/06/19, 5:30pm' avatarTitle='SV' />
            </View>
            <View style={styles.postDetail}>
                <Text>This is a post</Text>
            </View>
            <View style={styles.commentsSec}>
                <Text>Like</Text>
                <Text>Comments</Text>
            </View>
        </View>
    );
};
const styles = {


    containerStyle: {
        backgroundColor: '#eee',
        height: '100%',
    },
    headerStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#424372',
    },
    editSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    progressSection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        backgroundColor: '#424372',
        opacity: 0.9,


    },
    completionDateContainer: {
        color: '#fff',
    },
    completionDateHeader: {
        color: '#fff',
        fontSize: 10,
    },
    addMemberSec: {
        width: '100%',
        backgroundColor: '#ccc',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        flexDirection: 'row',

    },
    addMemberStyle: {
        transform: [{ rotate: '45deg' }],
    },
    upadatePostSec: {
        backgroundColor: '#fff',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 3,
        paddingRight: 5,
        paddingLeft: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
    },
    postDetail: {
        backgroundColor: '#fff',
        borderTop: '1px',
        marginLeft: 20,
        marginRight: 20,
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopWidth: 0.5,
        borderColor: '#d6d7da',
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentsSec: {
        flexDirection: 'row',
        color: '#000',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderTop: '1px',
        borderTopWidth: 0.5,
        borderColor: '#d6d7da',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: 20,
        marginRight: 20,
    }

};

export default GoalLandingDetail;
