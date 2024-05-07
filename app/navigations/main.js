// Main component
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Register, Login, Splash ,Task, Projet, Listprojet , ProjectTab} from '../screens';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="BottomTabNavigator">
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen name="Login" component={Login} />
      <MainStack.Screen name="Splash" component={Splash} />
      <MainStack.Screen name="Register" component={Register} />
      <MainStack.Screen name="Task" component={Task} />
      <MainStack.Screen name="Projet" component={Task} />
      <MainStack.Screen name="Listprojet" component={Task} />
      <MainStack.Screen name="ProjectTab" component={ProjectTab} />


    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="register"
      screenOptions={{
        tabBarInactiveTintColor: '#cdcdcd',
        tabBarActiveTintColor: 'red',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 2,
        },
      }}>
 
      <BottomTab.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register',
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="folder" size={20} solid />
          ),
        }}
      />

<BottomTab.Screen
        name="Projet"
        component={Projet}
        options={{
          title: 'Projet',
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="folder" size={20} solid />
          ),
        }}
      />

      <BottomTab.Screen
        name="Listprojet"
        component={Listprojet}
        options={{
          title: 'Listprojet',
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="folder" size={20} solid />
          ),
        }}
      />
       
      <BottomTab.Screen
      name="Login"
      component={Login} 
      options={{
        title: 'Login',
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="user" size={20} solid />
        ),
      }}
    />

    <BottomTab.Screen
      name="Task"
      component={Task}
      options={{
        title: 'Task',
        tabBarIcon: ({ color }) => (
          <Icon color={color} name="plus" size={20} solid />
        ),
      }}
    />

<BottomTab.Screen
        name="Paramétre"
        component={Register}
        options={{
          title: 'Paramétre',
          tabBarIcon: ({ color }) => (
        <Icon color={color} name="cog" size={20} solid />           ),
        }}
      />


      {/* Add other bottom tab screens here */}
    </BottomTab.Navigator>
  );
}

export default Main;
