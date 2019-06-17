import React, { Component } from 'react';
import { Text , View , Image } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import GoalTemplate from './goalListingComponents/goalTemplate';
import plusIcon from '../../images/add.png';
import minusIcon from '../../images/remove.png';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import GoalDetails from './goalDetail';





// import GoalHeader from './goalListingComponents/goalHeader';


class GoalListing extends Component {
    constructor() {
        super();
        this.state = { collapsed: false };
      }
    renderImage(){
        if(!this.state.collapsed){
            return (<Image style={ styles.iconStyle } source={plusIcon}></Image>);
        }else{
            return (<Image style={ styles.iconStyle } source={minusIcon}></Image>);
        }
      }
      
    render() {
        const expiredGoalList = expData.map((data) => {
            return (
               <GoalTemplate data = {data} navigation={this.props.navigation} ></GoalTemplate>
            )
          })
          const inProgressGoalList = inProgressGoalData.map((data) => {
            return (
               <GoalTemplate data = {data} navigation={this.props.navigation} ></GoalTemplate>
            )
          })
          const completedGoalList = completedGoalData.map((data) => {
            return (
               <GoalTemplate data = {data} navigation={this.props.navigation} ></GoalTemplate>
            )
          })

        return (
        <View>
            <Collapse isCollapsed={this.state.collapsed}>
              <CollapseHeader style={styles.containerStyle} onToggle={(isCollapsed)=>this.setState({collapsed:isCollapsed})}>
                <View style={styles.containerContentStyle} >
                  <Text>Your Expired Goals</Text>
                  {this.renderImage()}
              </View>
                </CollapseHeader>
              <CollapseBody>
              {expiredGoalList}
              </CollapseBody>
            </Collapse>
            <Collapse isCollapsed={this.state.collapsed}>
              <CollapseHeader style={styles.containerStyle} onToggle={(isCollapsed)=>this.setState({collapsed:isCollapsed})}>
                <View style={styles.containerContentStyle} >
                  <Text>Your In progress Goals</Text>
                  {this.renderImage()}
              </View>
                </CollapseHeader>
              <CollapseBody>
              {inProgressGoalList}
              </CollapseBody>
            </Collapse>
            <Collapse isCollapsed={this.state.collapsed}>
              <CollapseHeader style={styles.containerStyle} onToggle={(isCollapsed)=>this.setState({collapsed:isCollapsed})}>
                <View style={styles.containerContentStyle} >
                  <Text>Your Completed Goals</Text>
                  {this.renderImage()}
              </View>
                </CollapseHeader>
              <CollapseBody>
              {completedGoalList}
              </CollapseBody>
            </Collapse>
      </View>
        );
    }
}
const styles = {
    containerStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        height: 40,
        paddingLeft:16,
        paddingRight:16,
        backgroundColor: '#eee',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        
    },
    iconStyle:{
        height:20,
        width:20
    },
    containerContentStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    }
}
const expData =[
    {
        name : "Expired Goal1",
        description : "test",
        createdBy : "Abhijeet Kumar",
        createdFor : "Ganapati",
        taskType : "Project Goals",
        isHighImpact : 'no',
        isPublic : 'no',
        isCompleted : 'no',
        percentage : 30,
        expDay:161,
        daysRemaining:-100,
        dueOn:'13-06-2019',
        id:1
    },
    {
        name : "Expired Goal2",
        description : "test",
        createdBy : "Abhijeet Kumar",
        createdFor : "Ganapati",
        taskType : "Project Goals",
        isHighImpact : 'no',
        isPublic : 'no',
        isCompleted : 'no',
        percentage : 30,
        expDay:161,
        daysRemaining:-100,
        dueOn:'13-06-2019',
        id:2
    },
    {
        name : "Expired Goal2",
        description : "test",
        createdBy : "Abhijeet Kumar",
        createdFor : "Ganapati",
        taskType : "Project Goals",
        isHighImpact : 'no',
        isPublic : 'no',
        isCompleted : 'no',
        percentage : 30,
        expDay:161,
        daysRemaining:-100,
        dueOn:'13-06-2019',
        id:3
    },
]
const inProgressGoalData =[
    {
        name : "In progress goal1",
        description : "test2",
        createdBy : "Abhijeet Kumar",
        createdFor : "Ganapati",
        taskType : "Project Goals",
        isHighImpact : 'no',
        isPublic : 'no',
        isCompleted : 'no',
        percentage : 80,
        daysRemaining:100,
        expDay:161,
        dueOn:'13-06-2019',
        id:4
    },
    {
        name : "In Progress Goal2",
        description : "test",
        createdBy : "Abhijeet Kumar",
        createdFor : "Ganapati",
        taskType : "Project Goals",
        isHighImpact : 'no',
        isPublic : 'no',
        isCompleted : 'no',
        percentage : 10,
        expDay:161,
        daysRemaining:100,
        dueOn:'13-06-2019',
        id:5
    },
]
const completedGoalData =[
    {
        name : "CompletedGoal1",
        description : "test",
        createdBy : "Abhijeet Kumar",
        createdFor : "Ganapati",
        taskType : "Project Goals",
        isHighImpact : 'no',
        isPublic : 'no',
        isCompleted : 'no',
        percentage : 100,
        expDay:161,
        daysRemaining:100,
        dueOn:'13-06-2019',
        id:6
    },
    
]
export default GoalListing