import React, {useEffect} from 'react';
import {StatusBar, Platform,Alert, useColorScheme} from 'react-native';
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
import  DetailTask  from '../screens/detailsTask';

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';


const RootStack = createStackNavigator();

export default function Navigator() {




  // Function to handle notifications
  /*
  const handleNotification = async (remoteMessage) => {
    if (remoteMessage) {
      console.log('remoteMessage?.data?.notificationData', remoteMessage?.data?.notificationData);
      const redDotState = {
        CommitmentRedDot: true, // Set the red dot state as needed
        ElbourakRedDot: false,
        TransfertMPRedDot: { received: false, sent: false },
        TransfertComionRedDot: false,
      };
      const { page, modelId } = remoteMessage.data;
      switch (page) {
        case 'Commitment':
          const notificationData = remoteMessage?.data?.notificationData;
          console.log('Dispatching notificationData:', notificationData); // Debugging line
          const parsedData = typeof notificationData === 'string' ? JSON.parse(notificationData) : notificationData;

          console.log('parsedData:', parsedData);
         await dispatch(NotificationActions.onAddNotification(parsedData, redDotState));
         //Vibration.vibrate([500, 1000, 500]);
       
          Alert.alert(
            remoteMessage.notification.title,
            remoteMessage.notification.body,
            [
              { 
                text: 'OK', 
                onPress: () => {
                 // navigate('PreviewCommandsHistory', { commandid: modelId });
                  console.log('Alert closed');
                }
              }
            ],
            { cancelable: false }
          );
          
        
          break;
        default:
          console.log('Unhandled notification page:', page);
      }
    }
  };
*/

  const handleNotification = (remoteMessage) => {
    if (remoteMessage) {
  
      // Display an alert with notification details
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Notification handled:');
            },
          },
        ],
        { cancelable: false }
      );
  
      console.log('Notification Data:');
    }
  };
  

/*
  useEffect(() => {
    const channelId = 'default-channel-id';
    const channelName = 'Default Channel';

    PushNotification.createChannel({
      channelId,
      channelName,
      channelDescription: 'A default channel for general notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    }, (created) => console.log(`createChannel returned '${created}'`));

    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
      }
    };

    const getFCMToken = async () => {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('FCM Token:', fcmToken);
        } else {
          console.log('Failed to get FCM token');
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    // Foreground message handler
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground remoteMessage:', remoteMessage);
      handleNotification(remoteMessage);
    });

    // Background message handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background remoteMessage:', remoteMessage);
      handleNotification(remoteMessage);
    });

    // Handle notification opened from background
    const notificationOpenedListener = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('App opened by notification while in background:', remoteMessage);
      if (remoteMessage) {
        handleNotification(remoteMessage);
      }
    });

    // Handle notification opened from closed state
    messaging().getInitialNotification().then((remoteMessage) => {
      console.log('App opened by notification from closed state:', remoteMessage);
      if (remoteMessage) {
        handleNotification(remoteMessage);
      }
    });

    requestUserPermission();

    return () => { 
      unsubscribe();
      notificationOpenedListener();
    };
  }, []);
*/


useEffect(() => {
  // Foreground message handler
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log('Foreground remoteMessage:', remoteMessage);
    handleNotification(remoteMessage);
  });

  // Handle notification opened from background or closed state
  const notificationOpenedListener = messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('App opened by notification:', remoteMessage);
    handleNotification(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('App opened by notification from closed state:', remoteMessage);
        handleNotification(remoteMessage);
      }
    });

  return () => {
    unsubscribe();
    notificationOpenedListener();
  };
}, []);






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
        <RootStack.Screen name="DetailTask" component={DetailTask} />



      </RootStack.Navigator>
    </NavigationContainer>
  );
}