import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomActionButton from '../../components/CustomActionButton';

export default class WelcomeScreen extends Component {
    render() {
        return (
            <View style={{
                flex:1,
                backgroundColor: '#ffffff'
            }}>
                <View style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent: 'center'
                }}>
                    <Ionicons
                        name='md-cube'
                        size={150}
                        style={{color:'#c513af'}}
                    />
                    <Text style={{
                        fontWeight: '100',
                        fontSize: 28,
                        color: '#232a38'
                    }}>
                        Warehouse Manager
                    </Text>
                </View>
                <View style={{
                    flex:1,
                    alignItems: 'center'
                }}>
                    <CustomActionButton
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                        style={{
                            width: 200,
                            backgroundColor: '#17bebb',
                            marginBottom: 10,
                        }}
                        title='Login in'>
                        <Text style={{color: '#fff'}}> Login </Text>
                    </CustomActionButton>
                </View>
            </View>
        );
    }
}