import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './StackNavigation';
export default function index() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
