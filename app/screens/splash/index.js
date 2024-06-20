import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, PermissionsAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
  const [Loading, setLoading] = useState('');
  const [isConnected, setisConnected] = useState(false);
  const [ConnectedDescription, setConnectedDescription] = useState('');
  const [reload, setReload] = useState(false); // State for reloading component
  const [Loader, setLoader] = useState(true);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(false); // New state to track user check

  useEffect(() => {
    const checkuser = async () => {
      const userData = await AsyncStorage.getItem('User');
      console.log('userrr from asyncstorage', userData);

      if (userData) {
        setUser(JSON.parse(userData)); // Parse the JSON string to an object
      } else {
        setUser(null);
      }
      setUserChecked(true); // Mark user check as done
    };

    // Clear all data when the component mounts
    setLoading('');
    setisConnected(false);
    setConnectedDescription('');
    setLoader(true);

    checkuser();
  }, [reload]); // Reload whenever the reload state changes

  useEffect(() => {
    if (userChecked) {
      // Proceed with other steps after user check is complete
      onProcess();
    }
  }, [userChecked]);

  const checkNotificationPermission1 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
        navigation.navigate('Main');
      } else {
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onProcess = async () => {
    setLoading('Chargement en cours');

    // Wait for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check internet connectivity
    setLoading('Vérifier la connectivité Internet ...');
    NetInfo.fetch().then((state) => {
      // Wait for 1 second before processing the connectivity state
      setTimeout(() => {
        handleConnectivityChange(state);
      }, 1000);
    });
  };

  const handleConnectivityChange = (state) => {
    console.log('state', state);
    if (!state.isConnected) {
      setLoading('Pas de connexion Internet');
      setLoader(false);
      setConnectedDescription('Assurez-vous que le wifi ou les données mobiles sont activés, puis réessayez.');
    } else {
      setLoading('Checking user connectivity');
      setConnectedDescription('Checking if user connecting or not ....');

      setTimeout(() => {
        console.log('Checking user connectivity');
        console.log('useruser', user);

        if (!user) {
          navigation.navigate('Login');
        }
        else {
          navigation.replace('Main');
        }

        setLoader(false);
      }, 2000);
    }
  };

  const Reessayer = () => {
    setReload(!reload); // Set reload state to trigger a reload of the component
  };

  return (
    <View style={styles.container}>
      <Text>{Loading}</Text>
      <Text>{ConnectedDescription}</Text>
      {ConnectedDescription.length !== 0 && (
        <TouchableOpacity onPress={Reessayer}>
          <Text>Réessayer</Text>
        </TouchableOpacity>
      )}
      {Loader && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
