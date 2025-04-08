import {View, Text, Alert, StyleSheet, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {Link} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId:
    '234074786191-oas51tnckjjoi1uqu3b75fr0rk15d4sg.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();

  // Try the new style of google-sign in result, from v13+ of that module
  let idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    signInResult.data!.idToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
export default function LoginScreen({navigation, route}: any) {
  const [user, setUser] = useState(route.params?.name ?? '');
  const [pass, setPass] = useState(route.params?.pass ?? '');
  const handleLogin = async () => {
    if (!user || !pass) {
      return Alert.alert('error', 'Fields are required');
    }
    try {
      const users = (await AsyncStorage.getItem('users')) ?? '[]';
      const userData = JSON.parse(users).find(
        (u: any) => u.email === user && u.pass === pass,
      );
      console.log({userData, users});
      if (!userData) {
        return Alert.alert('error', 'Invalid creds');
      }
      if (userData.name !== user || userData.pass !== pass) {
        return Alert.alert('error', 'Invalid creds');
      }
      await AsyncStorage.setItem('user-session', JSON.stringify(userData));
      navigation.navigate('Home', {user: userData});
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
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
      <Text>
        have not account?{' '}
        <Link screen={'Register'} params={{user}} style={style.link}>
          register
        </Link>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
