import React, { Component } from 'react';
import {View, Text} from 'react-native';
import CustomActionButton from '../components/CustomActionButton';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class SettingsScreen extends Component {

    signOut = async () => {
        
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('WelcomeScreen')
        } catch (err) {
            alert('Unable to sign out right now')
        }
    };

    render() {
        return (
            <View style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CustomActionButton
                    onPress={ this.signOut }
                    style={{
                        width: 200,
                        backgroundColor: '#17bebb'
                    }}
                    title='Log Out'>
                    <Text style={{color: '#fff'}}> Log Out </Text>
                </CustomActionButton>
            </View>
        );
    }
}