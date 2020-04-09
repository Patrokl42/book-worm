import React, { Component } from 'react';
import {
    View,
    ScrollView,
    SafeAreaView,
    Text,
    Platform
} from 'react-native';
import { DrawerItems } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

export default class CustomDrawerComponent extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView style={{backgroundColor: '#fff'}}/>
                <View style={{
                    height: 170,
                    backgroundColor: '#fff',
                    alignItems:'center',
                    justifyContent:'center',
                    paddingTop: Platform.OS === 'android' ? 20 : 0
                }}>
                    <Ionicons
                        name='md-cube'
                        size={100}
                        color='#c513af'/>
                    <Text style={{
                        fontSize:24,
                        fontWeight: '500',
                        color: '#232a38'
                    }}>
                        Warehouse Manager
                    </Text>
                </View>
                <DrawerItems {...this.props}/>
            </ScrollView>
        );
    }
}