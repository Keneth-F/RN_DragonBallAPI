import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabsNavigation';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import PlanetDetailScreen from '../screens/PlanetDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Character"
        component={CharacterDetailScreen}
        options={({ route }: { route: any }) => ({
          title: route.params?.character?.name ?? 'Desconocido',
        })}
      />
      <Stack.Screen
        name="Planet"
        component={PlanetDetailScreen}
        options={({ route }: { route: any }) => ({
          title: `Planeta ${route.params?.planet?.name ?? 'Desconocido'}`,
        })}
      />
    </Stack.Navigator>
  );
}
