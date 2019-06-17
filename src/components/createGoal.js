/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from './common/button';
import Input from './common/input';
import Assignee from './createGoalComponents/Assignee';


class CreateGoalPage extends Component {
    render() {
        const { name, description } = this.props;
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
                    value={name}
                />
                {/* Goal Description */}
                <Input
                    label="Description"
                    multiline
                    numberOfLines={4}
                    value={description}
                />
                {/* NOTE: Add the DatePicker and ProgressBar component */}

                {/* Assign To */}
                <Text style={styles.assignToStyle}>Assign To</Text>
                <Assignee />
                <Button
                    title='Save'
                    style={saveButtonStyle}
                />
                <Button
                    title='Delete'
                    style={deleteButtonStyle}
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
        marginBottom: 10,
    }
};

export default CreateGoalPage;
