import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });

    useEffect(() => {
        if(error){
            Alert.alert('Ah Ocurrido un Error', error, [{text: 'Ok'}]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;

        if (isSignup) {
            action =
                authActions.signup(
                    formState.inputValues.email,
                    formState.inputValues.password,
                )
        } else {
            action =
                authActions.login(
                    formState.inputValues.email,
                    formState.inputValues.password,
                )
        }
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(action);
            //props.navigation.navigate('Shop');
        } catch (err){
            setError(err.message);
            setIsLoading(false);
        }        
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={50}
            style={styles.screen}>
            <LinearGradient colors={[Colors.grad1, Colors.grad2]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="Correo"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Porfavor introduzca una direccion de Correo Valida"
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id="password"
                            label="Contraseña"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Porfavor introduzca una Contraseña Valida"
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> :<Button
                                title={isSignup ? 'Registrarse' : 'Acceder'}
                                color={Colors.primary}
                                onPress={authHandler}
                            />}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Cambiar a ${isSignup ? 'Acceder' : 'Registrarse'}`}
                                color={Colors.accent}
                                onPress={() => {
                                    setIsSignup(prevState => !prevState);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export const screenOptions = {
    headerTitle: 'ChispiStore',
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        height: '50%',
        maxHeight: 400,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 15,
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AuthScreen;