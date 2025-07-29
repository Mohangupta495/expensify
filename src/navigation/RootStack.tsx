
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SMSPermissionScreen from '../screens/SMSPermissionScreen';
import Login from '../screens/Login';
import OnboardingScreen from '../screens/GetStarted';

function RootStack() {
    const Stack = createNativeStackNavigator();

    return (        
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
  <Stack.Screen name="Login" component={Login} />
  <Stack.Screen name="SMSPermission" component={SMSPermissionScreen} />
  <Stack.Screen name="Onboarding" component={OnboardingScreen} />
</Stack.Navigator>

    );
  }

  export default RootStack;