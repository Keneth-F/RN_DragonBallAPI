import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplahScreen({ navigation }: any) {
    useEffect(() => {
        AsyncStorage
            .getItem('user-session')
            .then((user) =>
                user
                    ? navigation.replace('Home', { user })
                    : navigation.replace('Login')
            );

    }, []);

    return (
        <View style={style.container}>
            <ActivityIndicator size="large" color={'#FFA500'} />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
