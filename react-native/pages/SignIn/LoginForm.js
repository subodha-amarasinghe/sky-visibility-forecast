import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import {signInAction} from '../../actions/auth';
const LoginForm = () => {
    const navigation = useNavigation();
    const currentUser = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(true);

  
    useEffect(() => {
        if (currentUser.isAuthenticated){
            navigation.replace('Landing');
        } else {
            if(currentUser.error) {
                setErrorMessage(currentUser.error.message?currentUser.error.message:'Signin error please try again later');
            }
        }
            
    }, [currentUser]);

    const handleSubmit = () => {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (username === "") {
            setUsernameError({ hasError: true, message: "Please enter username" });
        }
        if (username !== "" && !usernameRegex.test(username)) {
            setUsernameError({
                hasError: true,
                message: "Please enter valid username"
            });
        }
        if (password === "") {
            setPasswordError({
                hasError: true,
                message: "Please enter password."
            });
        }
        if (usernameRegex.test(username) && password !== "") {
            dispatch(signInAction({username:username, password:password}))
            // setTimeout(() => {
            //     navigation.replace('Landing');
            // }, 1000);
        }
    }

    function handleSetUsername(text) {
        setUsername(text)
        setUsernameError(null);
        setErrorMessage(null);
    }

    function handleSetPassword(pwd) {
        setPassword(pwd);
        setPasswordError(null);
        setErrorMessage(null);
    }

    return (
        <View>
            <View style={styles.inputWrap}>
                <TextInput
                    onChangeText={(text) => handleSetUsername(text)}
                    value={username}
                    style={styles.textInputs}
                    autoCompleteType="username"
                    label="Username"
                    placeholder="Username"
                    mode="flat"
                    theme={{
                        colors: {
                            placeholder: '#aaa',
                            text: "white"
                        },
                    }}
                />
                <HelperText type="error" visible={usernameError}>
                    {usernameError ? usernameError.message : null}
                </HelperText>
            </View>
            <View style={styles.inputWrap}>
                <TextInput
                    onChangeText={(text) => handleSetPassword(text)}
                    value={password}
                    style={styles.textInputs}
                    autoCompleteType="password"
                    label="Password"
                    placeholder="Password"
                    secureTextEntry={true}
                    mode="flat"
                    theme={{
                        colors: {
                            placeholder: '#aaa',
                            text: "white"
                        },
                    }}
                />
                <HelperText type="error" visible={passwordError}>
                    {passwordError ? passwordError.message : null}
                </HelperText>
            </View>
            {errorMessage ? (
                <View>
                <Text style={{ color: "red", textAlign: "center" }}>
                    {errorMessage}
                </Text>
                </View>
            ) : null}
            <View style={styles.inputWrap}>
                <Button mode="contained" loading={currentUser.fetching} onPress={handleSubmit}>Login</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrap: {
        margin: 10,
        color: '#fff',
    },
    textInputs: {
        color: '#fff',
        backgroundColor: 'transparent',
    },
});

export default LoginForm;
