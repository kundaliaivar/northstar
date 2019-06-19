/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import Button from './common/button';
import Input from './common/input';
import Assignee from './createGoalComponents/Assignee';
import { DatePickerDialog } from "react-native-datepicker-dialog";
import Calender from '../../images/calender.png';
import AddPerson from '../../images/addPerson.png';
// import console = require('console');



class CreateGoalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      DateText: "", 
      goalName: '',
      DateHolder: null , assignToMySelf:true };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const goalDetails = navigation.getParam('goalDetails', {}); 
    const edit = navigation.getParam('edit', false); 
    if(edit){
      this.setState({
        goalName: goalDetails.name,
        description: goalDetails.description,
        DateText: goalDetails.dueOn

      });
    }
  }

  
  onDatePickedFunction = date => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  };

  DatePickerMainFunctionCall = () => {
    let DateHolder = this.state.DateHolder;
    if (!DateHolder || DateHolder == null) {
      DateHolder = new Date();
      this.setState({
        DateHolder
      });
    }

    //To open the dialog
    this.refs.DatePickerDialog.open({
      date: DateHolder,
      minDate: new Date()
    });
  };
  assignGoal() {
    if (this.state.assignToMySelf) {
        return (<Assignee fnPressButton={this.changeStateValue.bind(this)} />);
    } else {
        return (<Image style={styles.AddPerson} source={AddPerson}></Image>);
    }
  }

  changeStateValue() {
      this.setState({ assignToMySelf: false });
  }

  createGoal = () => {
    console.log('inside creategoal');
    console.log(AsyncStorage.getItem('userId'));
    
    //      description: '...', 
    //      createdBy:{userId:'11232',userName:'ravi'},
    //      createdFor:{userId:'232323',userName:'john'},
    //      taskType:'CC',
    //      isHighImpact:false,
    //      isPublic:true,
    //      dueOn:'2019-06-20T04:18:21.931Z',
    //      lastUpdateOn:'2019-06-12T04:18:21.931Z',
    //      createdOn:'2019-06-11T04:18:21.931Z',
    //      isCompleted:false,
    axios.post('http://127.0.0.1:8080/api/createGoal', {
      name: this.state.goalName,
      description: this.state.description,
      createdBy: { userId: 'user1', userName: 'user1' },
      createdFor: { userId: 'user1', userName: 'user1' },
      taskType: 'Project Goals',
      isHighImpact: false,
      isPublic: false,
      dueOn: '2019-06-20T04:18:21.931Z',
      percentage: 0,
      isCompleted: false
    })
    .then(res => {
      console.log(res);
      // console.log(this.props);
      this.props.navigation.navigate('Home'); 
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    const { name, description } = this.state;
  
    const saveButtonStyle = {
      color: '#424372',
      type: 'solid'
    };
    const deleteButtonStyle = {
      color: '#424372',
      type: 'clear'
    };
    return (
      <View style={styles.containerStyle}>
        {/* Goal Name */}
        <Input 
          label="Goal Name" 
          value={this.state.goalName} 
          onChange={text => this.setState({ goalName: text })} 
        />
        {/* Goal Description */}
        <Input
          label="Description"
          multiline
          numberOfLines={4}
          value={this.state.description}
          onChange={text => this.setState({ description: text })}
        />
        {/* NOTE: Add the DatePicker and ProgressBar component */}
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <Text>Select Date</Text>
          <View>
            <TouchableOpacity
              onPress={this.DatePickerMainFunctionCall.bind(this)}
              style={styles.datePickerBoxContainer}
            >
              <View style={styles.datePickerBox}>
                <Text style={styles.datePickerText}>{this.state.DateText}</Text>
                <Image style={styles.calenderStyle} source={Calender} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Assign To */}

        <Text style={styles.assignToStyle}>Assign To</Text>
        {this.assignGoal()}

        <Button title="Save" style={saveButtonStyle} onPress={this.createGoal} />
        <Button title="Delete" style={deleteButtonStyle} />
        <DatePickerDialog
          ref="DatePickerDialog"
          onDatePicked={this.onDatePickedFunction.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    padding: 10
  },
  assignToStyle: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10
  },
  datePickerBox: {
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 0.5,
    padding: 10,
    height: 38,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  datePickerText: {
    fontSize: 14,
    borderWidth: 0,
    color: '#000'
  },
  datePickerBoxContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '98%'
  },
  AddPerson: {
      height: 50,
      width: 50,
      marginLeft: 10
  }

};

export default CreateGoalPage;
