import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Button, IconButton, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Avatarimage from "../../assets/images/avatar.png";
import {signOut} from '../../actions/auth';
const UserProfile = () => {
    const currentUser = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (!currentUser.isAuthenticated){
            navigation.replace('SignIn');
        } 
    }, [currentUser]);

    function handleSignOut(){
        dispatch(signOut())
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{alignItems: 'flex-end'}}>
                <IconButton icon="close" onPress={() => navigation.replace('Landing')}/>
            </View>

            <View style={styles.container}>
                <Avatar.Image source={Avatarimage} />
                <Text style={styles.text}>{currentUser&&currentUser.user&&currentUser.user.userData.firstname&&currentUser.user.userData.firstname} {currentUser&&currentUser.user&&currentUser.user.userData.lastname&&currentUser.user.userData.lastname}</Text>
                <Text style={styles.text}>{currentUser&&currentUser.user&&currentUser.user.userData.email&&currentUser.user.userData.email}</Text>
                <Button icon="logout" mode="contained" onPress={handleSignOut}>Logout</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    contentWrap: {
        flex: 1,
        justifyContent: 'center',

        alignSelf: 'stretch',
        textAlign: 'center',
    },
    heading: {
        color: '#66ff00',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default UserProfile;
