import React, {Component} from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/auth';

export default class LoadingScreen extends Component {
    componentDidMount() {
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // navigate to the home page
                this.props.navigation.navigate('HomeScreen', {user});
            } else {
                // navigate user to the login screen
                this.props.navigation.navigate('LoginStackNavigator');
            }
        })
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator color='#c513af' size='large'
                />
            </View>
        );
    }
}