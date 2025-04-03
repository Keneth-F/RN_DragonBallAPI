import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from './BottomTabsNavigation';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import PlanetDetailScreen from '../screens/PlanetDetailScreen';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Initial">
      <Stack.Screen
        name="Initial"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Character"
        component={CharacterDetailScreen}
        options={({route}: {route: any}) => ({
          title: route.params?.character?.name ?? 'Desconocido',
        })}
      />
      <Stack.Screen
        name="Planet"
        component={PlanetDetailScreen}
        options={({route}: {route: any}) => ({
          title: `Planeta ${route.params?.planet?.name ?? 'Desconocido'}`,
        })}
      />
    </Stack.Navigator>
  );
}
