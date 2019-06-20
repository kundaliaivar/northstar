import React,{useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MemberInfo from './common/memberInfo';
import Like from '../../images/like.png';
import { Icon, Button } from 'react-native-elements';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { stringLiteral } from '@babel/types';




const FeedSample = (props) => {

   const [liked, setliked] = useState(false);
   const [starsCount, setStarsCount] = useState(0);
   const [edit, setedit] = useState(false);
   const [updatedText, setupdatedText] = useState('');


   const {
       item,
   } = props;


   useEffect(() => {
     
    setStarsCount(item.stars.length);
    setupdatedText(item.feedBody);

   }, []);
 

   const updateLike = () => {
       if (!liked) {
        axios.put(`http://10.10.80.237:8080/api/likefeed/${item._id}`, {userName: 'shaili'})
        .then(res => {
            if (res.data && !item.stars.includes('shaili')) {
        setliked(true);
        setStarsCount(starsCount + 1);
        }
            console.log(res)})
        .catch(err => {
            console.log(err);
        })
    }
   };

   const updateEditedText = () => {
       const data = {
           feedBody: updatedText
       };
        axios
            .put(`http://10.10.80.237:8080/api/editfeed/${item._id}`, data)
            .then(res => {
                console.log(res.data);
                setedit(false);
                // setupdatedText('');
            })
            .catch(e => console.log(e));
   };

   const onEditClose = () => {
       if (!edit) {
        setedit(true);
       }
    else {
        setedit(false);
        // setupdatedText('');
    }
   };


    return (
        <View> 
            <View>
                <MemberInfo 
                 goalName={item.userName} 
                 date={moment.utc(item.createdOn).format('L,HH:mm a')} 
                 avatarTitle={item.userName.slice(0, 1).toUpperCase()} 
                 onAction={() => onEditClose()}
                 edit={edit}
                />
            </View>
            <View style={styles.postDetail}>
                {edit ? (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput style={{ width: '85%' }} value={updatedText} onChangeText={text => setupdatedText(text)} />
                    <Button title="Post" style={{ width: '20%' }} buttonStyle={{ backgroundColor: '#ccc', padding: 5 }} titleStyle={{ color: 'black' }} onPress={updateEditedText} />
                </View>
                ) : (
                <Text>{updatedText}</Text>
                )}
            </View>
            <View style={styles.commentsSec}>
                <TouchableOpacity style={styles.likeStyle} onPress={() => updateLike()}>
                    <Icon
                        name={item.stars.includes('shaili') || liked ? 'md-star' : 'md-star-outline'}
                        type='ionicon'
                        />

                    <Text>{starsCount}</Text>
                </TouchableOpacity>
                
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
    likeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 35,
    }
    

}
export default FeedSample;
