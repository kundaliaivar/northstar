/* eslint-disable react/require-extension */
/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import RangeSlider from 'rn-range-slider';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import axios from 'axios';
import Button from './common/button';
import Input from './common/input';
import Assignee from './createGoalComponents/Assignee';
import Calender from '../../images/calender.png';
import AddPerson from '../../images/addPerson.png';
import FilledIcon from '../../images/filled.png';
import HighImpactIcon from '../../images/highImpact.png';

const dbConfig = require('../../server/configs/database.config.js');

// import console = require('console');


class CreateGoalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DateText: '',
      DateHolder: null,
      assignToMySelf: true,
      autosuggest: false,
      addPerson: true,
      selection: '',
      showHighImpactIcon: false,
      isHighImpact: false,
      userList: [],
      description: '',
      goalName: '',
      selectedUser: '',
      rangeHigh: 0,
      value: 0,
      nameError: '',
      descriptionError: '',
      dateError: '',
      edit: false,
    };
  }
componentDidMount() {
    const { navigation } = this.props;
    const goalDetails = navigation.getParam('goalDetails', {}); 
    const edit = navigation.getParam('edit', false); 
    if (edit) {
    this.setState({
      goalName: goalDetails.goalName,
      description: goalDetails.description,
      DateText: goalDetails.dueOn
    });
    }
}
  componentWillUpdate() {
    axios.get(`${dbConfig.ipAddress}api/users`)
    .then(response => {
        console.log('users:', response.data.data);
        // this.setState({ userList: response.data.data });
    })
    .catch(err => {
        console.log(err);
    });
    }

  
  onDatePickedFunction = date => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  };

  onChangeHandler = (value) => {
    this.setState({ selectedUser: value });
  }
  assignGoal() {
  if (this.state.assignToMySelf) {
      return (<Assignee fnPressButton={this.changeStateValue.bind(this)} />);
    } 
    return (
        <TouchableOpacity
        onPress={() => this.setState({ autosuggest: true, addPerson: false })}
        >
          {this.state.addPerson && (
            <Image style={styles.AddPerson} source={AddPerson} />
            )}
        </TouchableOpacity>
      );   
  }
  DatePickerMainFunctionCall = () => {
      let DateHolder = this.state.DateHolder;
      if (!DateHolder || DateHolder == null) {
        DateHolder = new Date();
        this.setState({
          DateHolder,
          dateError: ''
        });
      }
  
      //To open the dialog
      this.refs.DatePickerDialog.open({
        date: DateHolder,
        minDate: new Date()
      });
    };
    showHighImpactIcon() {
    if (this.state.showHighImpactIcon) {
      return (
        <TouchableOpacity
          onPress={() =>
            this.setState({ showHighImpactIcon: false, isHighImpact: true })
          }
        >
          {this.state.showHighImpactIcon && (
            <Image style={styles.highImpactStyle} source={FilledIcon} />
          )}
        </TouchableOpacity>
      );
    } 
      return (
        <TouchableOpacity
          onPress={() =>
            this.setState({ showHighImpactIcon: true, isHighImpact: false })
          }
        >
          <Image style={styles.highImpactStyle} source={HighImpactIcon} />
        </TouchableOpacity>
      ); 
}
  changeStateValue() {
    this.setState({ assignToMySelf: false });
  }

  validate = () => {
    const { goalName, description, DateText } = this.state;
    let notValid = false;
    // Check for empty name
    if (goalName.trim() === '') {
      this.setState({ nameError: 'Enter a valid Goal name' });
      notValid = true;
    }
    // Check for empty description
    if (description.trim() === '') {
      this.setState({ descriptionError: 'Enter a valid Goal description' });
      notValid = true;
    }
    // Check for empty date
    if (DateText.trim() === '') {
      this.setState({ dateError: 'Enter a valid due on date' });
      notValid = true;
    }
    if (!notValid) {
        this.createGoal();
    }
  }

  createGoal = () => {
          AsyncStorage.getItem('userId')
          .then(id => {
          if (id) {
              axios.post(`${dbConfig.ipAddress}api/createGoal`, {
                name: this.state.goalName,
                description: this.state.description,
                createdBy: { userId: 'user1', userName: 'user1' },
                createdFor: { userId: this.state.selectedUser, userName: this.state.selectedUser },
                taskType: 'Project Goals',
                isHighImpact: this.state.isHighImpact,
                isPublic: false,
                dueOn: this.state.DateText,
                percentage: this.state.value,
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
  render() {
    const data = [{
        value: 'Abhijeet',
      }, {
        value: 'Abhishek',
      }, {
        value: 'Ayush',
      },
      {
        value: 'Ravi',
      }, 
      {
        value: 'Ganapati',
      }, 
      {
        value: 'Shaili',
      }, 
      {
        value: 'Suprita',
      }, 
    ];
    const { navigation } = this.props;
    let goalDetails = [];
    if (navigation.state.params) {
      goalDetails = navigation.getParam(goalDetails, navigation.state.params.itemId); 
      this.setState({
        goalName: goalDetails.goalName,
        description: goalDetails.description,
        DateText: moment(goalDetails.dueOnDate).format('DD-MMM-YYYY'),
        edit: true
      });
    } else if (this.state.edit) {
      this.setState({
        edit: false
      });
    }
    const saveButtonStyle = {
      color: '#424372',
      type: 'solid'
    };
    const deleteButtonStyle = {
      color: '#424372',
      type: 'clear'
    };
    return (
  
        <ScrollView>
          <View > 
          {/* Goal Name */}
          <Input
            label="Goal Name"
            value={this.state.goalName}
            onChange={text => this.setState({ nameError: '', goalName: text })}
            errorMessage={this.state.nameError}
          />
          {/* Goal Description */}
          <Input
            label="Description"
            multiline
            numberOfLines={4}
            value={this.state.description}
            onChange={text => this.setState({ descriptionError: '', description: text })}
            errorMessage={this.state.descriptionError}
          />
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text>Select Date</Text>
            <View>
              <TouchableOpacity
                onPress={this.DatePickerMainFunctionCall.bind(this)}
                style={styles.datePickerBoxContainer}
              >
                <View style={styles.datePickerBox}>
                  <Text style={styles.datePickerText}>
                    {this.state.DateText}
                  </Text>
                  <Image style={styles.calenderStyle} source={Calender} />
                </View>
                <Text style={styles.datePickerErrorText}>
                  {this.state.dateError}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Slider */}

          {this.state.edit && (
            <View style={styles.datePickerBoxContainer}>
              <Text style={{ marginLeft: 10 }}>Progress</Text>
              <RangeSlider
                style={{ width: 350, height: 60 }}
                min={0}
                rangeEnabled={false}
                thumbBorderWidth={12}
                lineWidth={15}
                step={1}
                labelBorderWidth={1}
                labelBorderRadius={1}
                selectionColor="#B46BAB"
                blankColor="#fafafa"
                disableRange
                onValueChanged={(low) => {
                  this.setState({ value: low });
                }}
              />
            
            </View>
          )}

          {/* Assign To */}

          <Text style={styles.assignToStyle}>Assign To</Text>
          {this.assignGoal()}
          {this.state.autosuggest && (
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Dropdown
                label='Select Member to Assign!'
                data={data}
                onChangeText={(value) => this.onChangeHandler(value)}
                />
              </View>
          )}
          <View style={styles.iconContainerStyle}>
            <Text>Mark as High Impact</Text>
            {this.showHighImpactIcon()}
          </View>

        <Button title="Save" style={saveButtonStyle} onPress={this.validate.bind(this)} />
        {this.state.edit && (
          <Button title="Delete" style={deleteButtonStyle} />
        )}
        <DatePickerDialog
          ref="DatePickerDialog"
          onDatePicked={this.onDatePickedFunction.bind(this)}
        />
      </View>
      </ScrollView>
    );
  }
}


const styles = {
  containerStyle: {
    padding: 10,
    flexGrow: 1,
    height: 10
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
  iconContainerStyle: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center'
  },

  datePickerText: {
    fontSize: 14,
    borderWidth: 0,
    color: '#000'
  },
  datePickerErrorText: {
    fontSize: 14,
    borderWidth: 0,
    color: '#f00'
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
  },
  highImpactStyle: {
    height: 35,
    width: 35
  }
};


export default CreateGoalPage;
