import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSplashNavigation } from '../../hooks/splash/useSplashNavigation';
import { styles } from '../../styles/splash/splash.styles';

const SplashScreen = () => {
  useSplashNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Your App Name</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
