import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import defaultPhoto from '../../images/defaultPhoto.png';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


class GoalDetails extends Component {
    state = {
        data: [],

    }
    componentWillMount() {
        axios.get(`http://127.0.0.1:8080/api/goal/${this.props.navigation.state.params.itemId}`)
        .then(response => { console.log(response); this.setState({ data: response.data }); })
        .catch(err => {
        console.log(err);
    })
    }
    showHighImpactValue(isHighImpact){
      if (isHighImpact) {
      return (<Text style={styles.text}>True</Text>);
      } else {
      return (<Text style={styles.text}>False</Text>);
      }
    }
    render() {
      const data = this.state.data;
    
        return (
            <View style={styles.GoalDetailsContainer}>
              <Text style={styles.headingText}>Goal Name</Text>
              <Text style={styles.text}>{data.name}</Text>
              <Text style={styles.headingText}>Goal Description</Text>
              <Text style={styles.text}>{data.description}</Text>
              <Text style={styles.headingText}>Complete By</Text>
              <Text style={styles.text}>06/10/2019</Text>
              <Text style={styles.headingText}>Goal Type</Text>
              <Text style={styles.text}>Project Goals</Text>
              <Text style={styles.headingText}>Progress</Text>
              <Text style={styles.text}>{data.percentage}%</Text>
              <Text style={styles.headingText}>High Impact</Text>
              <Text style={styles.text}>{data.isHighImpact}</Text>
              <Text style={styles.text}>Public</Text>
              <Text style={styles.text}>{data.isPublic}</Text>
              
            </View>
        </ScrollView>
        );
    }
}
const styles = {
    headingText: {
        paddingTop: 16,
        color: '#aaaaaa',
        fontSize: 12,
    },
    text: {
        paddingTop: 8,
        fontSize: 16,
        color: '#000000',
    },
    GoalDetailsContainer:{
        paddingTop:7,
        paddingBottom:7,
        paddingLeft:16,
        paddingRight:16
    },
    memberInfoStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10
    }
}
export default GoalDetails