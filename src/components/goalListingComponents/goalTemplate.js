import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import moment from 'moment';
// import FilledIcon from "../../images/filled.png";
// import HighImpactIcon from "../../images/highImpact.png";

class GoalListing extends Component {
    setColor(item) {
        if(item.percentage==100)
        return "green";
        else if(item.percentage<100 && moment(item.dueOn).isBefore(moment()))
        return "red";
        else if(item.percentage<100)
        return "purple";
    }
    render() {
          
        const { navigation}=this.props;

            if(this.props.data.length < 1)
            return(<View></View>);

        return (
            <TouchableOpacity style={styles.goalTemplateStyle} onPress={() => navigation.navigate('GoalLandingDetail', { itemId: this.props.data._id })}>
                <View style={styles.contaierStyle}>
                    <Text style={styles.taskName}>{this.props.data.name}</Text>
                    <View style={styles.statusStyle}>
                        <Text>{this.props.data.percentage} % |</Text>
                        <Text>Exp by {this.props.data.expDay} days</Text>
                    </View>
                </View>
                <View>
                    <ProgressCircle percent={this.props.data.percentage} radius={20} borderWidth={8} color={this.setColor(this.props.data)} shadowColor='#fafafa' bgColor="#fff"></ProgressCircle>
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
