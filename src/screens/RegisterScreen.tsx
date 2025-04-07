import { View, Text, StyleSheet, Alert, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Link } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation, route }: any) {
    const [name, setName] = useState(route.params?.user ?? '');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !pass) {
            return Alert.alert('error', 'all field are required');
        }
        const user = {
            name, email, pass,
        };
        try {
            const users = await AsyncStorage.getItem('users') ?? '[]';
            await AsyncStorage.setItem('users', JSON.stringify(
                JSON.parse(users)
                    .concat(user))
            );
            Alert.alert('success', 'You are registered');
            navigation.navigate('Initial', { pass, name });
        } catch (error: any) {
            Alert.alert('error', error?.message ?? error);
        }
    };
    return (
        <View style={style.container}>
            <Text style={style.title}>Sign Up</Text>
            <TextInput placeholder="name" style={style.input} value={name} onChangeText={setName} />
            <TextInput placeholder="email" style={style.input} value={email} onChangeText={setEmail} />
            <TextInput placeholder="pass" style={style.input} secureTextEntry value={pass} onChangeText={setPass} />
            <Button title="create account" onPress={handleRegister} color={'#FFA500'} />
            <Link screen={'Login'} params={{}} style={style.link}>Login</Link>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 20, flex: 1, justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'yellow',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
