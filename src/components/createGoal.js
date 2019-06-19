/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
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
      DateText: '', 
      goalName: '',
      DateHolder: null,
      assignToMySelf: true,
      value: 0,
      autosuggest :false,
      addPerson:true,
      selection:''
    };
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

  changeStateValue() {
    this.setState({ assignToMySelf: false });
  }

  assignGoal() {
    if (this.state.assignToMySelf) {
        return (<Assignee fnPressButton={this.changeStateValue.bind(this)} />);
    } else {
        return (<Image style={styles.AddPerson} source={AddPerson}></Image>);
    }
  }

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

  createGoal = () => {
    AsyncStorage.getItem('userId')
    .then(id => {
      if (id) {
        axios.post('http://127.0.0.1:8080/api/createGoal', {
          name: this.state.goalName,
          description: this.state.description,
          createdBy: { userId: id, userName: id },
          createdFor: { userId: id, userName: id },
          taskType: 'Project Goals',
          isHighImpact: false,
          isPublic: false,
          dueOn: '2019-06-20T04:18:21.931Z',
          percentage: 0,
          isCompleted: (this.state.value === 100)
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
    });
  }
  assignGoal() {
    if (this.state.assignToMySelf) {
      return <Assignee fnPressButton={this.changeStateValue.bind(this)} />;
    } else {
    return (<TouchableOpacity onPress={() => this.setState({autosuggest:true , addPerson:false})}>{this.state.addPerson && <Image style={styles.AddPerson} source={AddPerson} />}</TouchableOpacity>);
    }
  }
  changeStateValue() {
    this.setState({ assignToMySelf: false });
  }
  render() {
    // const { name, description } = this.state;
    const saveButtonStyle = {
      color: '#424372',
      type: 'solid'
    };
    const deleteButtonStyle = {
      color: '#424372',
      type: 'clear'
    };
    return (
        <View style = {{flexGrow:1}}>
      <ScrollView style={styles.containerStyle}>
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
        <View style={styles.datePickerBoxContainer}>
          <Text style={{marginLeft:10}}>Progress</Text>
          <RangeSlider
            style={{ width: 350, height:60 }}
            min={0}
            rangeEnabled={false}
            max={100}
            thumbBorderWidth={12}
            lineWidth={15}
            step={1}
            labelBorderWidth={1}
            labelBorderRadius={1}
            selectionColor="#B46BAB"
            blankColor="#fafafa"
            onValueChanged={(low, high, fromUser) => {
              this.setState({ rangeLow: low, rangeHigh: high });
            }}
          />
        </View>

        {/* Assign To */}

        <Text style={styles.assignToStyle}>Assign To</Text>
        {this.assignGoal()}
        { this.state.autosuggest &&
        <AutoSuggest style = {{width:20,height:50 ,backgroundColor:'blue'}} placeholder="Select member to Assign!" onChangeText={(selection) => console.log()} onItemPress={(selection) => console.log("selection")} value={this.state.selection}
      terms={['Apple', 'Banana', 'Orange', 'Strawberry', 'Lemon', 'Cantaloupe', 'Peach', 'Mandarin', 'Date', 'Kiwi']}
    />
    }
        
        <Button title="Save" style={saveButtonStyle} onPress={this.createGoal} />
        <Button title="Delete" style={deleteButtonStyle} />
        <DatePickerDialog
          ref="DatePickerDialog"
          onDatePicked={this.onDatePickedFunction.bind(this)}
        />
      </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    padding: 10,
    flexGrow: 1,
    height:'10%'
  },
  assignToStyle: {
    marginLeft: 10,
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
