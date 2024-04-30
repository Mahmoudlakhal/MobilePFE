import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
    const navigation = useNavigation();
  const [Loading, setLoading] = useState('');
  const [isConnected, setisConnected] = useState(false);
  const [ConnectedDescription, setConnectedDescription] = useState('');
  const [reload, setReload] = useState(false); // State for reloading component
  const [ToNextStep, setToNextStep] = useState(false);
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    // Clear all data when the component mounts
    setLoading('');
    setisConnected(false);
    setConnectedDescription('');
    setToNextStep(false);
    setLoader(true);

    // Start the loading process
    onProcess();
  }, [reload]); // Reload whenever the reload state changes

  const onProcess = async () => {
    setLoading('Chargement en cours');
  
    // Wait for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Check internet connectivity
    setLoading('Vérifier la connectivité Internet ...');
    NetInfo.fetch().then((state) => {
      // Wait for 2 seconds before processing the connectivity state
      setTimeout(() => {
        handleConnectivityChange(state);
      }, 1000);
    });
  };
  

  const handleConnectivityChange = (state) => {
    setisConnected(state.isConnected);
    
    if (!state.isConnected) {
      setLoading('Pas de connexion Internet');
      setLoader(false);
      setConnectedDescription('Assurez-vous que le wifi ou les données mobiles sont activés, puis réessayez.');
    } else {
      setLoading('Checking Permissions');
      setConnectedDescription('');
      // Clear connected description
setConnectedDescription('');

// Simulate a 2-second delay before continuing
setTimeout(() => {
    // Turn off loader
    setLoader(false);

    // Navigate to login
    navigation.navigate('Login');
}, 2000)
      setLoader(false);
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