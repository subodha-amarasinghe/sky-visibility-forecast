import React, { useEffect, useState } from 'react';
import { Searchbar, Modal, Portal, IconButton } from 'react-native-paper';
import { View, Dimensions, StyleSheet, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from './Preloader';
import CurrentWeather from './CurrentWeather';
import { getCityWeather } from '../../actions/cityWeather'
import { getFavouriteCityList } from '../../actions/favourites'
import NoResults from './NoResults';
var deviceHeight = Dimensions.get("window").height;

const SearchBox = () => {
  const cityWeather = useSelector(state => state.cityWeather);
  const updateCity = useSelector(state => state.citySaving);
  const currentUser = useSelector(state => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("cityWeather==>", cityWeather)
  }, [cityWeather]);

  useEffect(() => {
    if (updateCity.status === 'updated') {
      hideModal();
      dispatch(getFavouriteCityList(currentUser.user.userData.id))
    }
  }, [updateCity]);
  const onChangeSearch = query => setSearchQuery(query);
  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  const handleSearch = () => {
    showModal()
    console.log("searchQuery", searchQuery)
    dispatch(getCityWeather(searchQuery))
  }
  return (
    <>
      <Searchbar
        placeholder="City Name...."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={() => {
          Keyboard.dismiss();
          handleSearch()
        }}
        onSubmitEditing={handleSearch}
      />

      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View style={styles.modelContainer}>
            <View style={{ alignItems: 'flex-end' }}>
              <IconButton icon="close" onPress={hideModal} />
            </View>
            <View style={styles.modalContent}>
              {cityWeather.fetching ?
                <Preloader />
                : cityWeather.weather&&cityWeather.weather.error ?
                  <NoResults />
                  : <CurrentWeather city={cityWeather.weather} />
              }
            </View>

          </View>
        </Modal>
      </Portal>

    </>
  );
};

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: "white",
    padding: 10,
    margin: 20,
    height:
      deviceHeight * 0.6
  },
  modalContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SearchBox;