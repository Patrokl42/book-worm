import React, { Component } from 'react';
import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/config';
import { Ionicons } from '@expo/vector-icons';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import WelcomeScreen from './screens/AppSwichNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoadingScreen from './screens/AppSwichNavigator/LoadingScreen';
import BooksReadScreen from './screens/HomeTabNavigator/BooksReadScreen';
import BooksReadingScreen from './screens/HomeTabNavigator/BooksReadingScreen';

import CustomDrawerComponent from './screens/DrawerNavigator/CustomDrawerComponent';
import { Provider } from 'react-redux';
import store from './redux/store';
import BooksCountContainer from './redux/containers/BooksCountContainer';

export default class App extends Component {
    constructor(){
        super();
        this.initializeFirebase()
    }
    initializeFirebase = () => {
        firebase.initializeApp(firebaseConfig);
    };
    render() {
        return(
            <Provider store={store}>
                <ActionSheetProvider>
                    <AppContainer/>
                </ActionSheetProvider>
            </Provider>
        )
    }
}

const HomeTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Total Books',
            tabBarIcon: ({tintColor}) => (
                <BooksCountContainer color={tintColor} type='books' />
            )
        }
    },
    BooksReadingScreen: {
        screen: BooksReadingScreen,
        navigationOptions: {
            tabBarLabel: 'Books Read',
            tabBarIcon: ({tintColor}) => (
                <BooksCountContainer color={tintColor} type='booksReading' />
            )
        }
    },
    BooksReadScreen: {
        screen: BooksReadScreen,
        navigationOptions: {
            tabBarLabel: 'Books Reading',
            tabBarIcon: ({tintColor}) => (
                <BooksCountContainer color={tintColor} type='booksRead' />
            )
        }
    }
},{
    tabBarOptions: {
        style: {
            backgroundColor: '#fff'
        },
        activeTintColor: '#c513af',
        inactiveTintColor: '#a7a9ac'
    }
});

const HomeStackNavigator = createStackNavigator({
    HomeTabNavigator: {
        screen:HomeTabNavigator,
        navigationOptions: ({navigation}) => {
            return {
                headerLeft:(
                    <Ionicons
                        name='md-menu'
                        size={30}
                        color={'#c513af'}
                        onPress={() => { navigation.openDrawer()}}
                        style={{marginLeft: 20}}
                    />
                ),
            }
        }
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 0
        },
        headerTintColor: '#a7a9ac'
    }
});

HomeTabNavigator.navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state.routes[navigation.state.index];

    switch(routeName) {
        case 'HomeScreen':
            return{
                headerTitle: 'Total Books'
            };
        case 'BooksReadingScreen':
            return{
                headerTitle: 'Books Reading'
            };
        case 'BooksReadScreen':
            return{
                headerTitle: 'Books Read'
            };
        default:
            return{
                headerTitle: 'Book Worm'
            };
    }
};

const AppCreateDrawerNavigator = createDrawerNavigator(
    {
        HomeStackNavigator: {
            screen: HomeStackNavigator,
            navigationOptions: {
                title: 'Home',
                drawerIcon: () => <Ionicons name='md-home' size={24} />
            }
        },
        SettingsScreen: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Settings',
                drawerIcon: () => <Ionicons name='md-settings' size={24} />
            }
        }
    },
    {
        contentComponent: CustomDrawerComponent,
        contentOptions: {
            activeTintColor: '#17bebb'
        }
    }
);

const LoginStackNavigator = createStackNavigator({
    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    LoginScreen: LoginScreen
},{
    mode:'model',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#fff'
        }
    }
});

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen,
    LoginStackNavigator,
    AppCreateDrawerNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);
