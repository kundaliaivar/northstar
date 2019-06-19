/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Button from "./common/button";
import Input from "./common/input";
import Assignee from "./createGoalComponents/Assignee";
import { DatePickerDialog } from "react-native-datepicker-dialog";
import Calender from "../../images/calender.png";
import AddPerson from "../../images/addPerson.png"
import moment from "moment";


class CreateGoalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      DateText: "", 
      DateHolder: null , assignToMySelf:true };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const goalDetails = navigation.getParam('goalDetails', {}); 
    const edit = navigation.getParam('edit', false); 
    if(edit){
      this.setState({
        name: goalDetails.name,
        description: goalDetails.description,
        DateText: goalDetails.dueOn

      });
    }
  }

  DatePickerMainFunctionCall = () => {
    let DateHolder = this.state.DateHolder;
    if (!DateHolder || DateHolder == null) {
      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }

    //To open the dialog
    this.refs.DatePickerDialog.open({
      date: DateHolder,
      minDate: new Date()
    });
  };
  onDatePickedFunction = date => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format("DD-MMM-YYYY")
    });
  };
  assignGoal() {
    if (this.state.assignToMySelf) {
        return (<Assignee fnPressButton={this.changeStateValue.bind(this)}/>);
    } else {
        return (<Image style={styles.AddPerson} source={AddPerson}></Image>);
    }
}
changeStateValue(){
    this.setState({assignToMySelf: false})
}
  render() {
    const { name, description } = this.state;
   
    // const goalDetails = navigation.getParam(goalDetails, navigation.state.params.itemId); 
    // const edit = navigation.getParam(edit, navigation.state.params.edit); 
    // console.log('-->', navigation.state.params.edit);
    const saveButtonStyle = {
      color: "#424372",
      type: "solid"
    };
    const deleteButtonStyle = {
      color: "#424372",
      type: "clear"
    };
    return (
      <View style={styles.containerStyle}>
        {/* Goal Name */}
        <Input label="Goal Name" value={name} />
        {/* Goal Description */}
        <Input
          label="Description"
          multiline
          numberOfLines={4}
          value={description}
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

        <Button title="Save" style={saveButtonStyle} />
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
    flexDirection: "row",
    justifyContent: "space-between"
  },

  datePickerText: {
    fontSize: 14,
    borderWidth: 0,
    color: "#000"
  },
  datePickerBoxContainer: {
    marginTop: 5,
    marginBottom: 10,
    width:'98%'
  },
  AddPerson:{
      height:50,
      width:50,
      marginLeft:10
  }

};

export default CreateGoalPage;
