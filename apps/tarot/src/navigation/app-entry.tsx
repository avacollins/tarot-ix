import * as Linking from 'expo-linking';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { PATHS, ROUTES } from './config';
import HomeScreen from '../screens/home';
import React from 'react';
import colors from 'ui/src/theme/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AppEntry = () => {
    const prefix = Linking.createURL('/');
    const linking = {
        prefixes: [prefix],
        config: { screens: PATHS }
    };

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors.silver_sand.base
        }
    };

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer theme={MyTheme} linking={linking}>
            <Stack.Navigator>
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        component={HomeScreen}
                        name={ROUTES.screens.HOME.name}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppEntry;
