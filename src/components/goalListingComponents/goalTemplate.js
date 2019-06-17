import React, { Component } from 'react';
import { Text , View , TouchableOpacity  } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import GoalDetails from '../goalDetail';


class GoalListing extends Component {
    setColor(daysRemaining){
        if(daysRemaining < 0){
          return ("red")
        }else{
            return ("pink")
            
        }
    }
    rendertext(data){
     if(data.daysRemaining < 0){
       return ("Expired by " + data.expDay + " Days");
    }else if(data.daysRemaining > 0 && data.percentage != 100){
       return (data.expDay + " Left");
    }else{
    return ("Completed " + data.dueOn );
}
    }
    render() {
        const { navigation, data } = this.props;
        return (
            <TouchableOpacity style = {styles.goalTemplateStyle} onPress = {() => navigation.navigate('GoalDetails',{
                itemId: data.id,})}>
            <View style = {styles.contaierStyle}>
              <Text style  = {styles.taskName}>{data.name}</Text>
                <View style  = {styles.statusStyle}>
                    <Text>{data.percentage} % |</Text>
                    <Text>{this.rendertext(data)}</Text>
                </View>
            </View>
            <View>
              <ProgressCircle percent={data.percentage} radius={20} borderWidth={8} color={this.setColor(data.daysRemaining)}  shadowColor='#fafafa' bgColor="#fff"></ProgressCircle>
            </View>
            </TouchableOpacity>
          
        );
    }
}
const styles = {
    goalTemplateStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:20,
        opacity:0.5
    },
    
    contaierStyle:{
        flexDirection:'column',
    },
    statusStyle:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    taskName:{
        textTransform: 'capitalize',
        letterSpacing: -0.5,
        // fontWeight: 600,
        width: '100%',
    }
}

export default GoalListing