/* eslint-disable no-shadow */
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { COLLECTIONS } from '../../constants';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type UseFirestore = {
    fetchUser: (
        uid: string
    ) => Promise<void | FirebaseFirestoreTypes.DocumentData | undefined>;
    updateUserInfo: (uuid: string, name: string, url: string) => Promise<boolean>;
    generateUserDocument: (
        user: FirebaseAuthTypes.User,
        additionalData?: FirebaseAuthTypes.AdditionalUserInfo
    ) => void;
};

const useFirestore = (): UseFirestore => {
    // USER
    const generateUserDocument = async (user, additionalData) => {
        if (!user) return;
        firestore()
            .collection(COLLECTIONS.USER)
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
                if (!documentSnapshot.exists) {
                    const { email, displayName, photoURL } = user;
                    const avatar = photoURL
                        ? photoURL
                        : 'https://loremflickr.com/320/240/tarot';
                    firestore()
                        .collection('users')
                        .doc(user.uid)
                        .set({
                            email,
                            displayName,
                            avatar,
                            ...additionalData
                        });
                }
            });
    };

    const fetchUser = async (uid: string) => {
        if (!uid) return;

        return firestore()
            .collection(COLLECTIONS.USER)
            .doc(uid)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists()) {
                    return documentSnapshot.data();
                }

                return;
            });
    };

    const updateUserInfo = async (uid: string, name: string, url: string) => {
        if (!uid) return false;

        return firestore()
            .collection(COLLECTIONS.USER)
            .doc(uid)
            .update({ displayName: name, photoURL: url })
            .then(() => true)
            .catch(e => {
                console.log('reading updating ', e);

                return false;
            });
    };

    return {
        generateUserDocument,
        fetchUser,
        updateUserInfo
    };
};

export default useFirestore;
