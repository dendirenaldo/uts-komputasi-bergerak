import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Home from './screens/Home';
import Informasi from './screens/Informasi';

const Stack = createNativeStackNavigator();
const Route = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SplashScren"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' }
                }}
            >
                <Stack.Screen name='home' component={Home} />
                <Stack.Screen name='informasi' component={Informasi} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route