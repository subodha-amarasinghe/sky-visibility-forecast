import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addFavouriteCity } from '../../actions/favourites';

const CurrentWeather = ({city}) => {
    const updateCity = useSelector(state => state.citySaving)
    const dispatch=useDispatch();
    useEffect(() => {
        console.log("city==>>", city)
    }, []);
    
    function handleAddToFavourires(cityDetails){
        dispatch(addFavouriteCity(cityDetails))
    }
    return (
        <View>
            <View>
                <Text style={styles.cityName}>{city.name}</Text>
                <View style={styles.cityDetail}><Text style={{ fontSize: 24, marginBottom:10 }}>{parseInt(city.main.temp-273.15)}&deg;</Text></View>
                <View style={styles.cityDetail}>
                    <Text style={{fontSize:12}}>{city.weather[0]['description']}</Text>
                        <Image
                            style={{width:48, height:48}}
                            source={{uri:'http://openweathermap.org/img/wn/'+city.weather[0]['icon']+'.png'}}
                        />
                    
                    <Text>&nbsp;&nbsp; {city.clouds.all}%</Text>
                </View>
                <View style={styles.cityDetail}>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}><Icon name="star" size={18} /></View>
                </View>
                <View>
                    <Button icon="heart" mode="contained" loading={updateCity.fetching} onPress={() =>handleAddToFavourires(city)}>Add to favoutites</Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cityName: {
        fontSize: 20,
        margin: 10,
        alignItems: "center",
        textAlign: "center"
    },
    cityDetail: {
        fontSize: 24,
        margin: 10,
        alignItems: "center",

    }
})

export default CurrentWeather;