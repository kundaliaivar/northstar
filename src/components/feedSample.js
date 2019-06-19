import React from 'react';
import { View, Text} from 'react-native';
import MemberInfo from './common/memberInfo';


const FeedSample = (props) => {
   const {
       item,
   } = props;

    return (
        <View> 
            <View>
                <MemberInfo goalName={item.createdBy.userName} date='14/06/19, 5:30pm' avatarTitle='SV' />
            </View>
            <View style={styles.postDetail}>
                <Text>{item.description}</Text>
            </View>
            <View style={styles.commentsSec}>
                <Text>Like</Text>
                <Text>Comments</Text>
            </View>
        </View>
    );

};

const styles = {
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
        borderTop: 1,
        borderTopWidth: 0.5,
        borderColor: '#d6d7da',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    

}
export default FeedSample;
