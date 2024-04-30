/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Index from './app/index';
import React, {useEffect} from 'react';

const App = () => {
  /*  useEffect(() => {
    requestPermission();
    getDeviceToken();
    subscribeToTokenRefresh();
  }, []);

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Device Token:', token);
    } catch (error) {
      console.error('Device token retrieval error:', error);
    }
  };

  const subscribeToTokenRefresh = () => {
    messaging().onTokenRefresh(token => {
      console.log('Refreshed Token:', token);
    });
  };
 */
  return <Index />;
};

export default App;