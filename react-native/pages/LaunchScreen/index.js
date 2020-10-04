import React, { useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const LaunchScreen = ({navigation}) => {
  useEffect(() => {
    checkSession();
  }, []);
  function checkSession() {
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 5500);
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/app-background.png')}
        style={styles.image}>
        <View style={styles.contentWrap}>
          <Text style={styles.text}>Sky Visibility Forecast</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#66ff00',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default LaunchScreen;
