import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import moment from 'moment';

class GoalListing extends Component {
    setColor(item) {
        if(item.percentage==100)
        return "green";
        else if(item.percentage<100 && moment(item.dueOn).isBefore(moment()))
        return "red";
        else if(item.percentage<100)
        return "purple";
    }
    setContent(item){
        if(item.percentage==100)
        return `Completed ${moment(item.dueOn)}`;
        // else if(item.percentage<100 && moment(item.dueOn).isBefore(moment()))
        // return `| Expired by ${ moment().diff(moment(item.dueOn),'days') moment(item.dueOn).subtract(moment(),'d') } days`;
        else if(item.percentage<100 )
        return `| ${moment(item.dueOn).subtract(moment(),'d')} days Left`;
    }
    render() {

            if(this.props.data.length<1)
            return(<View></View>);

        return (
            <TouchableOpacity style = {styles.goalTemplateStyle} onPress = {this.props.onPress}>
            <View style = {styles.contaierStyle}>
            <Text style  = {styles.taskName}>{this.props.data.name}</Text>
                <View style  = {styles.statusStyle}>
                    <Text>{this.props.data.percentage} %</Text>
                    <Text>{this.setContent(this.props.data)}</Text>
                </View>
            </View>
            <View>
            <ProgressCircle percent={this.props.data.percentage} radius={20} borderWidth={8} color={this.setColor(this.props.data)}  shadowColor='#fafafa'></ProgressCircle>
            </View>
            </TouchableOpacity>
        );
    }
}
const styles = {
    goalTemplateStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        opacity: 0.5
    },
    
    contaierStyle: {
        flexDirection: 'column',
    },
    statusStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    taskName: {
        textTransform: 'capitalize',
        letterSpacing: -0.5,
        // fontWeight: 600,
        width: '100%',
    }
};

export default GoalListing;
