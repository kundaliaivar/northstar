import React, { Component } from 'react';
import { Text , View , Image  } from 'react-native';
import defaultPhoto from '../../images/defaultPhoto.png';
import axios from 'axios';


class GoalDetails extends Component {
    state = {
        data:{},
       goalId:'5d07709f9d7037bddc80bd33'

    }
    componentWillMount(){
        axios.get(`http://10.10.80.230:8080/api/goal/${this.state.goalId}`)
        .then(response=>{
        this.setState({data:response.data});
    }).catch(err=>{
        console.log(err);
    })
    }
    render() {
      data = this.state.data;
    
        return (
            <View style = {styles.GoalDetailsContainer}>
              <Text style = {styles.headingText}>Goal Name</Text>
              <Text style = {styles.text}>{data.name}</Text>
              <Text style = {styles.headingText}>Goal Description</Text>
              <Text style = {styles.text}>{data.description}</Text>
              <Text style = {styles.headingText}>Complete By</Text>
              <Text style = {styles.text}>06/10/2019</Text>
              <Text style = {styles.headingText}>Goal Type</Text>
              <Text style = {styles.text}>Project Goals</Text>
              <Text style = {styles.headingText}>Progress</Text>
              <Text style = {styles.text}>{data.percentage}%</Text>
              <Text style = {styles.headingText}>High Impact</Text>
              <Text style = {styles.text}>{data.isHighImpact}</Text>
              <Text style = {styles.text}>Public</Text>
              <Text style = {styles.text}>{data.isPublic}</Text>
              {/* <Text style = {styles.headingText}>Created By</Text>
                    <View style = {styles.memberInfoStyle}>
                      <View style = {{width:20,height:20,marginRight:10}}>
                        <Image style = {{width:"100%",height:"100%"}} source = {defaultPhoto}/>
                      </View>
                        <Text>{data.createdBy.use}</Text>
                    </View>
                <Text style = {styles.headingText}>Assign To</Text>
                    <View style = {styles.memberInfoStyle}>
                      <View style = {{width:20,height:20,marginRight:10}}>
                        <Image style = {{width:"100%",height:"100%"}} source = {defaultPhoto}/>
                      </View>
                      <Text>{data.createdBy.userName}</Text>
                    </View>       */}
            </View>
        );
    }
}
const styles = {
    headingText :{
        paddingTop: 16,
        color: '#aaaaaa',
        fontSize: 12,
    },
    text:{
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