import React, {useEffect} from 'react';
import {StatusBar, Platform, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Main from '../navigations/main';
import Splash from './../screens/splash/index';
import Login from './../screens/login/index';
import Register from '../screens/register';
import Task from '../screens/task';
import Projet from '../screens/projet';
import Listprojet from '../screens/listprojet';
import  ProjectTab  from '../screens/projectTab';




const RootStack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash">
        <RootStack.Screen name="Main" component={Main} />
        <RootStack.Screen name="Splash" component={Splash} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Register" component={Register} />
        <RootStack.Screen name="Task" component={Task} />
        <RootStack.Screen name="Projet" component={Projet} />
        <RootStack.Screen name="Listprojet" component={Listprojet} />
        <RootStack.Screen name="ProjectTab" component={ProjectTab} />



      </RootStack.Navigator>
    </NavigationContainer>
  );
}