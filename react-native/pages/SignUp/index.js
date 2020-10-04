import React, { useEffect, useState } from "react";
import { Keyboard, ImageBackground, ScrollView,StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';

import SignupForm from "./SignupForm";

//import {resetAuthAction} from '../../actions/auth';

const SignUp = () => {
    const navigation=useNavigation();
    const [showLogo, setShowLogo] = useState(true);
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        console.log("auth==>", auth)
         if(auth.registeredUser&&auth.registeredUser.status==='done') {
            console.log("Signup Res===>", auth)
            navigation.replace('SignIn');
           
         }   
    }, [auth]);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        setShowLogo(false)
    };

    const _keyboardDidHide = () => {
        setShowLogo(true)
    };
    return (
        <ScrollView style={{flex:1}}>
            <View>
                <ImageBackground source={require("../../assets/images/app-background.png")} style={styles.image}>
                    <View style={styles.contentWrap}>
                        {showLogo ?
                            <View>
                                <Text style={styles.heading}>Welcome</Text>
                            </View>
                            : null}
                        <SignupForm />
                        <Button onPress={()=>{navigation.replace('SignIn')}}> Login </Button>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
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
    contentWrap: {
        flex: 1,
        justifyContent: "center",

        alignSelf: 'stretch',
        textAlign: 'center',
    },
    heading: {
        color: "#66ff00",
        fontSize: 24,
        fontWeight: "bold",
        margin: 20
    },

});

export default SignUp;
