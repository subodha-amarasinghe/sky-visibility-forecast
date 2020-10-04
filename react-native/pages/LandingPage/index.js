import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { ImageBackground, StyleSheet, View } from "react-native";
import SearchBox from "../../components/SearchBox";
import FavoriteCities from "./FavoriteCities";

const LandingPage = () => {
  const currentUser = useSelector(state => state.auth)
  const cityList = useSelector(state => state.favourite)
  const navigation = useNavigation();

  useEffect(() => {
    console.log("currentUser===>>", currentUser)
    if (!currentUser.isAuthenticated) {
      navigation.replace('SignIn');
    }
  }, [currentUser]);
  

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/images/light-background.jpg")} style={styles.image}>

        <View style={styles.contentWrap}>
          <View style={styles.searchBoxWrap}>
            <SearchBox />
          </View>
          <FavoriteCities cityList={cityList}/>
        </View>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  searchBoxWrap: {
    margin: 10,
    top: 10
  },
  contentWrap: {
    flex: 1,
  },
  heading: {
    color: "#66ff00",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10
  },

});

export default LandingPage;
