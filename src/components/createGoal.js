/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import Button from './common/button';
import Input from './common/input';


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
            <View>
                <Input
                    label="Goal Name"
                    value={name}
                />
                <Input
                    label="Description"
                    multiline
                    numberOfLines={4}
                    value={description}
                />
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

export default CreateGoalPage;
