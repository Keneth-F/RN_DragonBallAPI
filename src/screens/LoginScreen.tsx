import { View, Text, Alert, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import {
    GoogleSignin,
    GoogleSigninButton,
    isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { Link } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
GoogleSignin.configure();
GoogleSignin.configure({
    webClientId: '584707924539-spnk51o6p78sge0e8f127pn7soncrub5.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
});

const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();
        if (isSuccessResponse(response)) {
            return response.data;
        } else {
            // sign in was cancelled by user
            return null;
        }
    } catch (error) {
        console.log({ error });
        throw error;
        // if (isErrorWithCode(error)) {
        //     switch (error.code) {
        //         case statusCodes.IN_PROGRESS:
        //             // operation (eg. sign in) already in progress
        //             break;
        //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        //             // Android only, play services not available or outdated
        //             break;
        //         default:
        //         // some other error happened
        //     }
        // } else {
        //     // an error that's not related to google sign in occurred
        // }
    }
};
export default function LoginScreen({ navigation, route }: any) {
    const [user, setUser] = useState(route.params?.name ?? '');
    const [pass, setPass] = useState(route.params?.pass ?? '');
    const handleLogin = async () => {
        if (!user || !pass) {
            return Alert.alert('error', 'Fields are required');
        }
        try {
            const users = await AsyncStorage.getItem('users') ?? '[]';
            const userData = JSON.parse(users)
                .find((u: any) => u.email === user && u.pass === pass);
            console.log({ userData, users });
            if (!userData) {
                return Alert.alert('error', 'Invalid creds');
            }
            if (userData.name !== user || userData.pass !== pass) {
                return Alert.alert('error', 'Invalid creds');
            }
            await AsyncStorage.setItem('user-session', JSON.stringify(userData));
            navigation.navigate('Home', { user: userData });
        } catch (error: any) {
            console.log(error?.message ?? error);
            Alert.alert('error', 'Invalid credentials');
        }
    };
    return (
        <View style={style.container}>
            <Text style={style.title}>Login</Text>
            <TextInput
                placeholder="User"
                style={style.input}
                value={user}
                onChangeText={setUser}
            />
            <TextInput
                placeholder="Password"
                style={style.input}
                value={pass}
                onChangeText={setPass}
                secureTextEntry={true}
            />
            <Button title="Login" onPress={handleLogin} color="#FFD700" />
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => { console.log(signInWithGoogle()); }}
                style={{ width: '100%' }}
            />
            <Text>
                have not account? <Link screen={'Register'} params={{ user }} style={style.link}>register</Link>
            </Text>

        </View>
    );
}


const style = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24, fontWeight: 'bold',
        marginBottom: 20, textAlign: 'center',
        color: '#FFA500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFD700',
        padding: 10,
        marginBottom: 10,
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
