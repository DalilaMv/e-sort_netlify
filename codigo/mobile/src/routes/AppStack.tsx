import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/home';
import Registration from '../pages/Registration';
import FormEvent from '../pages/FormEvent';
import NextEvent from '../pages/NextEvent';
import Sorteio from '../pages/Sorteio';
import Login from '../pages/Login';
import Tabs from './tabs';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name='Home' component={Home} />
                <Screen name='Registration' component={Registration} />
                <Screen name='FormEvent' component={FormEvent} />
                <Screen name='NextEvent' component={NextEvent} />
                <Screen name='Sorteio' component={Sorteio} />
                <Screen name='Login' component={Login} />
                <Screen name='Events' component={Tabs} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;