import { StyleSheet, View } from 'react-native';

import EmailPassword from '../email-password';
import React from 'react';

type SignupProps = {
    signup: ({ email, password }) => void;
    error: {
        type?: string;
        message: string;
    };
};

const Signup = ({ signup, error }: SignupProps) => (
    <View style={styles.container}>
        <View style={styles.loginForm}>
            <EmailPassword
                buttonPress={signup}
                buttonLabel="Sign up &amp; Login"
                error={error}
            />
        </View>
    </View>
);

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginForm: {
        width: '100%',
        padding: 20
    }
});
