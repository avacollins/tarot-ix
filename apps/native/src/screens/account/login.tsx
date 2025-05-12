import { SafeAreaView, StyleSheet } from 'react-native';

import { Login } from 'ui';
import { ROUTES } from '../../navigation/config';
import React from 'react';
import { useAuth } from '../../hooks';
import { useRouter } from 'solito/router';

const LoginScreen = () => {
    const { error, loginWithEmailAndPassword, loginAnonymously } = useAuth();

    const { push } = useRouter();

    const register = () => {
        push({ pathname: ROUTES.screens.SIGNUP.path });
    };

    const resetPassword = () => {
        push({ pathname: ROUTES.screens.FORGOT_PASSWORD.path });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Login
                signin={loginWithEmailAndPassword}
                signup={register}
                error={error}
                resetPassword={resetPassword}
                loginAnon={loginAnonymously}
            />
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
