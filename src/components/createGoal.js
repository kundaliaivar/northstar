/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import Button from "./common/button";
import Input from "./common/input";
import Assignee from "./createGoalComponents/Assignee";
import { DatePickerDialog } from "react-native-datepicker-dialog";
import RangeSlider from "rn-range-slider";
import { Dropdown } from 'react-native-material-dropdown';
import Calender from "../../images/calender.png";
import AddPerson from "../../images/addPerson.png";
import moment from "moment";
import FilledIcon from "../../images/filled.png";
import HighImpactIcon from "../../images/highImpact.png";
import axios from 'axios';

// import console = require('console');


class CreateGoalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DateText: "",
      DateHolder: null,
      assignToMySelf: true,
      autosuggest: false,
      addPerson: true,
      selection: "",
      showHighImpactIcon: false,
      isHighImpact: false,
      userList:[],
      description:'',
      goalName:'',
      selectedUser:'',
      rangeHigh:0
    };
  }
  componentWillUpdate(){
    axios.get(`http://10.10.80.230:8080/api/users`)
    .then(response=>{
        console.log("users:", response.data.data);
        this.setState({userList:response.data.data});
    })
    .catch(err=>{
        console.log(err);
    })
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
      return <Assignee fnPressButton={this.changeStateValue.bind(this)} />;
    } else {
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
  }
  sliderChange(selectedMaximum){
      console.log("selectedMaximum",selectedMaximum)
  }
  onChangeHandler = (value) => {
   this.setState({selectedUser:value});
  }
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
    } else {
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
  }
  changeStateValue() {
    this.setState({ assignToMySelf: false });
  }

  changeStateValue() {
      this.setState({ assignToMySelf: false });
  }

  createGoal = () => {
    console.log('inside creategoal');
    console.log(this.state);
    
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
    axios.post('http://10.10.80.230/api/createGoal', {
      name: this.state.goalName,
      description: this.state.description,
      createdBy: { userId: 'user1', userName: 'user1' },
      createdFor: { userId: this.state.selectedUser, userName: this.state.selectedUser },
      taskType: 'Project Goals',
      isHighImpact: this.state.isHighImpact,
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
    let data = [{
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
          <Input label="Goal Name" value={this.state.goalName} onChange={text => this.setState({goalName:text})} />
          {/* Goal Description */}
          <Input
            label="Description"
            multiline
            numberOfLines={4}
            value={this.state.description} onChange={text => this.setState({description:text})}
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
                  <Text style={styles.datePickerText}>
                    {this.state.DateText}
                  </Text>
                  <Image style={styles.calenderStyle} source={Calender} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
              disableRange={true}
              onValueChanged={(low) => {
                this.setState({ value: low });
              }}
            />
          
          </View>

          {/* Assign To */}

          <Text style={styles.assignToStyle}>Assign To</Text>
          {this.assignGoal()}
          {this.state.autosuggest && (
              <View style={{marginLeft:10 , marginRight:10}}>
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

        <Button title="Save" style={saveButtonStyle} onPress={this.createGoal} />
        <Button title="Delete" style={deleteButtonStyle} />
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
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    margin: 10,
    alignItems:"center"
  },

  datePickerText: {
    fontSize: 14,
    borderWidth: 0,
    color: '#000'
  },
  datePickerBoxContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "98%"
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