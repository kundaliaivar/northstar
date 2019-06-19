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
import AutoSuggest from "react-native-autosuggest";
import Calender from "../../images/calender.png";
import AddPerson from "../../images/addPerson.png";
import moment from "moment";
import FilledIcon from "../../images/filled.png";
import HighImpactIcon from "../../images/highImpact.png";

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
      isHighImpact: false
    };
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
      <View style={{ flexGrow: 1 }}>
        <ScrollView style={styles.containerStyle}>
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
          {this.state.autosuggest && (
            <AutoSuggest
              style={{ width: 20, height: 50, backgroundColor: "blue" }}
              placeholder="Select member to Assign!"
              onChangeText={selection => console.log()}
              onItemPress={selection => console.log("selection")}
              value={this.state.selection}
              terms={[
                "Abhijeet",
                "Abhishek",
                "Ayush",
                "Ganapati",
                "ravi",
                "Shaili",
                "Suprita"
              ]}
            />
          )}
          <View style={styles.iconContainerStyle}>
            <Text>Mark as High Impact</Text>
            {this.showHighImpactIcon()}
          </View>

          <Button title="Save" style={saveButtonStyle} />
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
    height: "10%"
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
