import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import Navigator from './navigations/index'; // Ensure the correct path to your Navigator

export default function Index() {
  return (
    <MenuProvider>
      <Navigator />
    </MenuProvider>
  );
}
