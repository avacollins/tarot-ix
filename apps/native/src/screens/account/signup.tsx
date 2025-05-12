import React from 'react';
import { Signup } from 'ui';
import { useAuth } from '../../hooks';

const SignupScreen = () => {
    const { error, createLoginWithEmailAndPassword } = useAuth();

    return <Signup error={error} signup={createLoginWithEmailAndPassword} />;
};

export default SignupScreen;
