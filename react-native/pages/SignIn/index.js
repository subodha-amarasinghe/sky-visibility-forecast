import React, { useEffect, useState } from "react";
import { Keyboard, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "./LoginForm";


const SignIn = (r) => {
    const navigation=useNavigation();
    const [showLogo, setShowLogo] = useState(true);

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
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/images/app-background.png")} style={styles.image}>
                <View style={styles.contentWrap}>
                    {showLogo ?
                        <View>
                            <Text style={styles.heading}>Welcome</Text>
                            <Text style={styles.text}>Please sign in with your username</Text>
                        </View>
                        : null}
                    <LoginForm />
                    <Button style={{marginTop:15}} onPress={()=>{navigation.replace('SignUp')}}> Signup </Button>
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
    text: {
        color: "#66ff00",
        fontSize: 16,
        margin: 20
    },

});

export default SignIn;
