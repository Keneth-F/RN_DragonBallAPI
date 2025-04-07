import 'react-native-gesture-handler';
import Navigation from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
    </GestureHandlerRootView>
);
export default App;
