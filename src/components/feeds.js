/**
 * Create Goal Page
 * Use this Page to create or edit Goals
 */

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Button from './common/button';
import Input from './common/input';
import MemberInfo from './common/memberInfo';


class Feeds extends Component {
    render() {
        const { name } = this.props;
        const saveButtonStyle = {
            color: '#424372',
            type: 'solid',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            lineHeight: '40px',
            textAlign: 'center',
        };
        const editButtonStyle = {
            border: 'none',
            backgroundColor: 'transparent',
            color: '#424372',
        }
        return (
            <View>
                <View>
                    <Input
                        placeholder="Post an update..."
                        value={name}
                    />
                    <Button
                        title='+'
                        style={saveButtonStyle}
                    />
                </View>
                <View>
                    <View>
                        <MemberInfo
                            timeStamp='28022019153000'
                        />
                        <Button
                            title='Edit'
                            style={editButtonStyle}
                        />
                    </View>
                    <View>
                        <Text>This is a Post</Text>
                    </View>
                    <View>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                        />
                        <Text>1 star</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default Feeds;
