import * as Linking from 'expo-linking';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { PATHS, ROUTES } from './config';
import React, { useEffect, useState } from 'react';

import HomeScreen from '../screens/home';
import LoginScreen from 'src/screens/account/login';
import colors from 'ui/src/theme/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks';

const AppEntry = () => {
    const { user, initializing } = useAuth();
    const [signedIn, setSignedIn] = useState(!!user?.uid);

    useEffect(() => {
        setSignedIn(!!user?.uid);
    }, [user]);

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

    if (initializing) return null;

    return (
        <NavigationContainer theme={MyTheme} linking={linking}>
            <Stack.Navigator>
                {signedIn ? (
                    <>
                        <Stack.Group screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                component={HomeScreen}
                                name={ROUTES.screens.HOME.name}
                            />
                        </Stack.Group>
                    </>
                ) : (
                    <>
                        <Stack.Group screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                component={LoginScreen}
                                name={ROUTES.screens.LOGIN.name}
                            />
                        </Stack.Group>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppEntry;
