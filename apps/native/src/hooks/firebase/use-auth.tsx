/* eslint-disable no-shadow */
import {
    FirebaseAuthTypes,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import useFirestore from './use-firestore';
import uuid from 'react-native-uuid';

export type LoginWithEmailAndPasswordProps = {
    email: string;
    password: string;
};

type ErrorProps = {
    type?: string;
    message: string;
};

type UseAuth = {
    createLoginWithEmailAndPassword: ({
        email,
        password
    }: LoginWithEmailAndPasswordProps) => void;
    error: ErrorProps;
    forgotPassword: (email: string) => Promise<void>;
    initializing: boolean;
    loginAnonymously: () => void;
    loginWithEmailAndPassword: ({
        email,
        password
    }: LoginWithEmailAndPasswordProps) => void;
    logout: () => Promise<void>;
    user?: FirebaseAuthTypes.User;
};

const useAuth = (): UseAuth => {
    const { generateUserDocument } = useFirestore();

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();
    const [error, setError] = useState<ErrorProps>({
        message: ''
    });

    function _onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        generateUserDocument(user);
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(getAuth(), _onAuthStateChanged);

        return subscriber; // unsubscribe on unmount
    }, []);

    const createLoginWithEmailAndPassword = ({
        email,
        password
    }: LoginWithEmailAndPasswordProps) => {
        setError({ message: '' });
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                setError({
                    message: 'oops, something went wrong, check your entry and try again'
                });
            });
    };

    const loginWithEmailAndPassword = ({
        email,
        password
    }: LoginWithEmailAndPasswordProps) => {
        setError({ message: '' });
        signInWithEmailAndPassword(getAuth(), email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                setError({
                    message: 'oops, something went wrong, check your entry and try again'
                });
            });
    };

    const loginAnonymously = () => {
        setError({ message: '' });

        const userId = uuid.v4();
        const regex = /-/g;
        const displayName = userId.toString().replace(regex, '').substring(0, 8);
        const email = `${displayName}@anon.com`;
        const password = 'anonymous';
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(user => {
                console.log('User account created & signed in!', user);
            })
            .catch(error => {
                setError({
                    message: 'oops, something went wrong, check your entry and try again'
                });
            });
    };

    const logout = () => signOut(getAuth()).then(() => console.log('User signed out!'));

    const forgotPassword = (emailAddress: string) =>
        sendPasswordResetEmail(getAuth(), emailAddress);

    return {
        createLoginWithEmailAndPassword,
        error,
        forgotPassword,
        initializing,
        loginAnonymously,
        loginWithEmailAndPassword,
        logout,
        user
    };
};

export default useAuth;
