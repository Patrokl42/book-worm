import React, {Component} from 'react';
import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import CustomActionButton from '../components/CustomActionButton';
import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    onSignIn = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true });
            try {
                const response = await firebase.auth()
                    .signInWithEmailAndPassword(this.state.email,
                        this.state.password);
                if (response) {
                    this.setState({isLoading: false})
                    this.props.navigation.navigate('LoadingScreen');
                }
            } catch (err) {
                this.setState({isLoading: false})
                switch (err.code) {
                    case 'auth/user-not-found':
                        alert('A user with this email does not exist. Try signing Up');
                        break;
                    case 'auth/invalid-email':
                        alert('Please Enter an email address');
                        break;
                }
            }
        } else {
            alert('Enter email and password');
        }
    };

    onSignUp = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true });
            try {
                const response = await firebase.auth()
                    .createUserWithEmailAndPassword(this.state.email,
                        this.state.password);
                if (response) {
                    this.setState({isLoading: false});
                    // sign in user
                    const user = await firebase.database().ref('users/').child(response.user.uid)
                                        .set({email: response.user.email, uid: response.user.uid});

                    this.props.navigation.navigate('LoadingScreen');
                }
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('User already Exists. Try Loggin in');
                }
            }
        } else {
            alert('Please enter email & password')
        }
    };

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#fff'
            }}>
                <View style={{marginTop: 25, fontSize:21}}>
                    <Text>E-mail:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            borderColor: '#c513af',
                            width: 280,
                            height: 50,
                            borderRadius: 5,
                            paddingLeft: 15,
                            marginTop: 3
                        }}
                        placeholder="abc@gmail.com"
                        keyboardType="email-address"
                        onChangeText={email => this.setState({email})}
                    />
                </View>
                <View style={{marginTop: 10, fontSize:21}}>
                    <Text>Password:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            borderColor: '#c513af',
                            width: 280,
                            height: 50,
                            borderRadius: 5,
                            paddingLeft: 15,
                            marginTop: 3
                        }}
                        placeholder="password"
                        secureTextEntry
                        onChangeText={password => this.setState({password})}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <CustomActionButton
                        onPress={this.onSignIn}
                        style={{
                            width: 200,
                            backgroundColor: '#17bebb',
                            marginBottom: 10,
                        }}
                        title='Login'>
                        <Text style={{color: '#fff'}}>Login</Text>
                    </CustomActionButton>
                    <CustomActionButton
                        onPress={this.onSignUp}
                        style={{
                            width: 200,
                            backgroundColor: '#fff',
                            marginBottom: 10,
                            borderColor: '#3a3a3a',
                            borderWidth: 0.5
                        }}
                        title='Sign Up'>
                        <Text style={{color: '#3a3a3a'}}>Sign Up</Text>
                    </CustomActionButton>
                </View>
                {
                    this.state.isLoading ?
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 5,
                            elevation: 1000,
                            marginTop: 15
                        }}>
                            <ActivityIndicator size='large' color='#5dba16'/>
                        </View>
                        : null
                }
            </View>
        );
    }
}