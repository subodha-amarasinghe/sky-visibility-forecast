import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getFavouriteCityList, deleteFavouriteCity } from "../../actions/favourites";

// import Axios from 'axios';
// const user_id = '5f74b23b62a0362dc8bec7bf';
function FavoriteCities() {
    const [removigId, setRemovigId] = useState(null);
    const currentUser = useSelector(state => state.auth)
    const cityList = useSelector(state => state.favourite)
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser.user.userData.id) {
            console.log("currentUser.user.userData.id", currentUser.user)
            dispatch(getFavouriteCityList(currentUser.user.userData.id))
        }
    }, []);


    useEffect(() => {
        console.log("cityList====>>>>", cityList)
    }, [cityList]);

    function handleDelete(id) {
        console.log("Deleting>", id);
        setRemovigId(id)
        dispatch(deleteFavouriteCity(id))
        setTimeout(() => {
            setRemovigId(null)
        }, 3000);
    }

    return (
        <ScrollView style={styles.container}>
            {cityList && cityList.favouriteCityList && cityList.favouriteCityList.length ? cityList.favouriteCityList.map((city, index) => (
                <View style={styles.singleRow} key={index}>
                    <Text style={styles.cityName}>{city.cityName}</Text>
                    <View style={styles.cityDetail}><Text style={{ fontSize: 20 }}>{city.temperature}&deg;</Text></View>
                    <View style={styles.cityDetail}>
                        <Image
                            style={{width:36, height:36}}
                            source={{uri:'http://openweathermap.org/img/wn/'+city.icon+'.png'}}
                        />
                        <Text>&nbsp;{city.clouds}%</Text>
                    </View>
                    <View style={styles.cityDetail}>
                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                            {removigId===city._id?
                                <Icon name="star" size={20} color='#444' />
                                :<Icon name="star" size={20} color='#cd7f32' onPress={() =>handleDelete(city._id)}/>
                            }
                        </View>
                    </View>
                </View>
            ))
                : <View style={styles.messageRow}>
                    <Text>Please add your favourite cities</Text>
                </View>
            }

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        top: 10,
        marginBottom:10
    },
    singleRow: {
        backgroundColor: '#fff',
        opacity: 0.8,
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    messageRow: {
        backgroundColor: '#fff',
        opacity: 0.9,
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        fontWeight: "700"
    },
    cityName: {
        flex: 4,
        fontSize: 16,
    },
    cityDetail: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        right: 0,
    }
});

export default FavoriteCities;
