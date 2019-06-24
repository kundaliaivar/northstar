import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import moment from 'moment';
import FilledIcon from "../../../images/filled.png";
import HighImpactIcon from "../../../images/highImpact.png";

class GoalListing extends Component {
    setColor(item) {
        if (item.percentage ==100){
            return 'green';
        } else if (item.percentage < 100 && moment(item.dueOn).isBefore(moment())){
            return 'red';
        } else if (item.percentage < 100){
            return 'purple';
        }
      }
    setContent(item) {
        if (item.percentage === 100){
            return (<Text style={{ color: this.setColor(item)}}> Completed on {moment.utc(item.dueOn).format('MMM DD')}</Text>);
        } else if (item.percentage < 100) {
            return (<Text style={{ color: this.setColor(item) }}> Expired On {moment.utc(item.dueOn).format('MMM DD')}</Text>);
        } else {
            return (<Text style={{ color: this.setColor(item) }}> Complete By {moment.utc(item.dueOn).format('MMM DD')}</Text>);
        }
    }
    renderHighImpactIcon(data) {
        if (data.isHighImpact) {
            return (<Image style={{ width: 25, height: 25 }} source= {FilledIcon} />);
        }else {
            return (<Image style={{ width: 25, height : 25 }} source= {HighImpactIcon} />);
        }
    }
    render(){
          
        const { navigation}=this.props;

            if(this.props.data.length < 1)
            return(<View></View>);

        return (
            <TouchableOpacity style={styles.goalTemplateStyle} onPress={() => navigation.navigate('GoalLandingDetail', { itemId: this.props.data._id })}>
                <View style = {{flexDirection:'row' , alignItems:'center'}}>
                    {this.renderHighImpactIcon(this.props.data)}
                <View style={styles.contaierStyle}>
                    <Text style={styles.taskName}>{this.props.data.name}</Text>
                    <View style={styles.statusStyle}>
                        <Text style = {{color:this.setColor(this.props.data)}}>{this.props.data.percentage} % |</Text>
                       {this.setContent(this.props.data)}
                    </View>
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
        
    },
    
    contaierStyle: {
        flexDirection: 'column',
        marginLeft: 5
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
