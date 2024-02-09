import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInPage from './src/pages/LogInPage';
import RegistrationForm from './src/components/RegistrationForm';
import GenerateScreen from './src/pages/GenerateScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

// New Component for Conditional Navigation
function AppNavigation() {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          // User is logged in
          <>
      
          </>
        ) : (
          // User is not logged in
          <>
            <Stack.Screen name="Home" component={GenerateScreen} />
            <Stack.Screen name="Log In" component={LogInPage} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={RegistrationForm} options={{ title: 'Sign Up' }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

export default App;
