import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Text, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import {signUpAction} from '../../actions/auth';
const SignupForm = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] =useState('')
    //const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [firstnameError, setFirstnameError] = useState(null);
    const [lastnameError, setLastnameError] = useState(null);
    const [emailError, setEmailError] =useState(null)

    const handleSubmit = async () => {
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
                message: "Please enter password"
            });
        }
        if (firstname === "") {
            setFirstnameError({
                hasError: true,
                message: "Please enter first name"
            });
        }
        if (lastname === "") {
            setLastnameError({
                hasError: true,
                message: "Please enter last name"
            });
        }
        if (email === "") {
            setEmailError({
                hasError: true,
                message: "Please enter email address"
            });
        }
        if ((!usernameError&&!passwordError&&!firstnameError&&!lastnameError&&!emailError)) {
            console.log("No error")
            dispatch(signUpAction({
                username:username, 
                password:password,
                firstname: firstname,
                lastname: lastname,
                email:email
            }))
        } else {
            console.log("validation error")
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
            <View style={styles.inputWrap}>
                <TextInput
                    onChangeText={(text) => {setFirstname(text); setFirstnameError(null)}}
                    value={firstname}
                    style={styles.textInputs}
                    label="First Name"
                    placeholder="Fiest Name"
                    mode="flat"
                    theme={{
                        colors: {
                            placeholder: '#aaa',
                            text: "white"
                        },
                    }}
                />
                <HelperText type="error" visible={firstnameError}>
                    {firstnameError ? firstnameError.message : null}
                </HelperText>
            </View>
            <View style={styles.inputWrap}>
                <TextInput
                    onChangeText={(text) => {setLastname(text); setLastnameError(null)}}
                    value={lastname}
                    style={styles.textInputs}
                    label="Last Name"
                    placeholder="Last Name"
                    mode="flat"
                    theme={{
                        colors: {
                            placeholder: '#aaa',
                            text: "white"
                        },
                    }}
                />
                <HelperText type="error" visible={lastnameError}>
                    {lastnameError ? lastnameError.message : null}
                </HelperText>
            </View>
            <View style={styles.inputWrap}>
                <TextInput
                    onChangeText={(text) => {setEmail(text); setEmailError(null)}}
                    value={email}
                    style={styles.textInputs}
                    label="Email"
                    placeholder="Email"
                    mode="flat"
                    theme={{
                        colors: {
                            placeholder: '#aaa',
                            text: "white"
                        },
                    }}
                />
                <HelperText type="error" visible={emailError}>
                    {emailError ? emailError.message : null}
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
                <Button mode="contained" loading={auth.isSigningUp} onPress={handleSubmit}>Signup</Button>
            </View>
            <Snackbar
                visible={auth.registeredUser&&auth.registeredUser.status==='done'}
                duration={1000}
            >
                Signup Success
            </Snackbar>
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

export default SignupForm;
