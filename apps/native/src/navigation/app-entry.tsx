import * as Linking from 'expo-linking';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { PATHS, ROUTES } from './config';
import React, { useEffect, useState } from 'react';

import AccountScreen from '../screens/account/account';
import ForgotPasswordScreen from '../screens/account/forgot-password';
import HistoryScreen from 'src/screens/readings/history';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/account/login';
import NewReading from '../screens/readings/new';
import PasswordReset from '../screens/account/password-reset';
import ReadingDetailScreen from '../screens/readings/reading-detail';
import ReadingScreen from '../screens/readings/reading';
import ShuffleScreen from '../screens/readings/shuffle';
import SignupScreen from '../screens/account/signup';
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
                            <Stack.Screen
                                component={AccountScreen}
                                name={ROUTES.screens.ACCOUNT.name}
                            />
                            <Stack.Screen
                                component={NewReading}
                                name={ROUTES.screens.NEW_READING.name}
                            />
                            <Stack.Screen
                                component={HistoryScreen}
                                name={ROUTES.screens.HISTORY.name}
                            />
                        </Stack.Group>
                        <Stack.Group
                            screenOptions={{
                                headerTitle: '',
                                headerBackTitle: '',
                                headerTintColor: colors.smoky_black.base,
                                headerStyle: {
                                    backgroundColor: colors.silver_sand.base
                                },
                                headerTitleAlign: 'center',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    fontSize: 36
                                },
                                headerShadowVisible: false
                            }}>
                            <Stack.Screen
                                component={ShuffleScreen}
                                name={ROUTES.screens.SHUFFLE.name}
                            />
                            <Stack.Screen
                                component={ReadingScreen}
                                name={ROUTES.screens.READING.name}
                            />
                            <Stack.Screen
                                component={ReadingDetailScreen}
                                name={ROUTES.screens.READING_DETAIL.name}
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
                        <Stack.Group
                            screenOptions={{
                                headerTitle: '',
                                headerBackTitle: '',
                                headerTintColor: colors.smoky_black.base,
                                headerStyle: { backgroundColor: colors.silver_sand.base },
                                headerShadowVisible: false
                            }}>
                            <Stack.Screen
                                component={SignupScreen}
                                name={ROUTES.screens.SIGNUP.name}
                            />
                            <Stack.Screen
                                component={ForgotPasswordScreen}
                                name={ROUTES.screens.FORGOT_PASSWORD.name}
                            />
                            <Stack.Screen
                                component={PasswordReset}
                                name={ROUTES.screens.PASSWORD_RESET.name}
                                options={{ headerShown: false }}
                            />
                        </Stack.Group>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppEntry;
