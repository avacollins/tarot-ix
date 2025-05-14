import firestore, {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc
} from '@react-native-firebase/firestore';

import { COLLECTIONS } from '../../constants';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ReadingProp } from 'ui/types';
import uuid from 'react-native-uuid';

type UseFirestore = {
    fetchDeck: () => Promise<FirebaseFirestoreTypes.DocumentData[]>;
    fetchSpread: () => Promise<void | FirebaseFirestoreTypes.DocumentData | undefined>;
    fetchCardsInSpread: (
        indexes: string[],
        reversals: boolean[]
    ) => Promise<ReadingProp[]>;
    fetchUser: (
        uid: string
    ) => Promise<void | FirebaseFirestoreTypes.DocumentData | undefined>;
    updateUserInfo: (uuid: string, name: string, url: string) => Promise<boolean>;
    generateReadingDocument: (userId: string) => Promise<string | undefined>;
    generateUserDocument: (
        user: FirebaseAuthTypes.User,
        additionalData?: FirebaseAuthTypes.AdditionalUserInfo
    ) => void;
    updateReading: (
        documentId: string,
        reading: string[],
        reversals: boolean[]
    ) => Promise<boolean>;
    updateReadingNotes: (documentId: string, notes: string) => Promise<boolean>;
    updateReadingTitle: (documentId: string, title: string) => Promise<boolean>;
    fetchReadingsForUser: (
        userId: string
    ) => Promise<FirebaseFirestoreTypes.DocumentData[]>;
    fetchReadingById: (
        id: string
    ) => Promise<void | FirebaseFirestoreTypes.DocumentData | undefined>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadData: (collectionName: string, data: any[], key: string) => void;
};

const useFirestore = (): UseFirestore => {
    // USER
    const generateUserDocument = async (user, additionalData) => {
        if (!user) return;
        const db = getFirestore();
        const docRef = doc(db, COLLECTIONS.USER, user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const { email, displayName, photoURL } = user;
            const avatar = photoURL ? photoURL : 'https://loremflickr.com/320/240/tarot';
            const docData = {
                email,
                displayName,
                avatar,
                ...additionalData
            };

            return await setDoc(docRef, docData);
        }

        return;
    };

    const fetchUser = async (uid: string) => {
        if (!uid) return;
        const db = getFirestore();
        const docRef = doc(db, COLLECTIONS.USER, uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }

        return;
    };

    const updateUserInfo = async (uid: string, name: string, url: string) => {
        if (!uid) return false;
        const db = getFirestore();
        const docRef = doc(db, COLLECTIONS.USER, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return await updateDoc(docRef, { displayName: name, photoURL: url });
        }

        return;
    };

    // READINGS
    const generateReadingDocument = async userId => {
        if (!userId) return;

        const documentId = uuid.v4().toString();
        const now = new Date();

        const document = {
            id: documentId,
            userId: userId,
            reading: [],
            creationTime: now.toString()
        };

        const db = getFirestore();
        const docRef = doc(db, COLLECTIONS.READING, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await setDoc(docRef, document);

            return documentId;
        }

        return;
    };

    const fetchReadingById = async (id: string) => {
        const db = getFirestore();
        const docRef = doc(db, COLLECTIONS.READING, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }

        return;
    };

    const fetchReadingsForUser = async userId => {
        if (!userId) return;
        const db = getFirestore();
        const q = query(
            collection(db, COLLECTIONS.READING).where('userId', '==', userId)
        );
        const querySnap = await getDocs(q);
        const readings: any = [];
        querySnap.forEach(doc => {
            readings.push(doc.data());
        });

        const res = readings
            .filter(data => !!data?.reading?.length && data?.reading?.length > 0)
            .sort((a, b) => {
                // ts fix for left hand assignment value https://github.com/microsoft/TypeScript/issues/5710
                const start = +new Date(a.creationTime);
                const elapsed = +new Date(b.creationTime) - start;

                return elapsed;
            });

        return res;
    };

    const updateReading = async (documentId, reading, reversals) => {
        const db = getFirestore();
        const docRef = doc(db, COLLECTIONS.READING, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return await updateDoc(docRef, { reading: reading, reversals: reversals });
        }

        return;
    };

    const updateReadingTitle = async (documentId, title) => {
        const db = getFirestore();
        const docRef = doc(db, COLLECTIONS.READING, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return await updateDoc(docRef, { title });
        }

        return;
    };

    const updateReadingNotes = async (documentId, notes) => {
        const db = getFirestore();
        const docRef = doc(db, COLLECTIONS.READING, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return await updateDoc(docRef, { notes });
        }

        return;
    };

    // APP
    const fetchDeck = async () => {
        const db = getFirestore();
        const q = query(collection(db, COLLECTIONS.DECK));
        const querySnap = await getDocs(q);
        const _cards: any = [];
        querySnap.forEach(doc => {
            _cards.push(doc.data());
        });

        return _cards;
    };

    const fetchSpread = async () => {
        const db = getFirestore();
        const docRef = doc(
            db,
            COLLECTIONS.SPREAD,
            '463e6970-13f6-11eb-996f-c1aa3726603e'
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }

        return;
    };

    const fetchCardsInSpread = async (indexes: string[], reversals: boolean[]) => {
        const db = getFirestore();
        const q = query(collection(db, COLLECTIONS.DECK).where('name', 'in', indexes));
        const querySnap = await getDocs(q);
        const _cards: any = [];
        querySnap.forEach(doc => {
            _cards.push(doc.data());
        });

        return _cards.map((card, index) => {
            card.reversed = reversals[index];

            return card;
        });
    };

    const uploadData = (collectionName: string, data: any[], key: string) => {
        const collection = firestore().collection(collectionName);

        data.forEach(item => {
            collection.doc(item[key]).set(item);
        });
    };

    return {
        generateUserDocument,
        fetchUser,
        generateReadingDocument,
        fetchReadingById,
        fetchReadingsForUser,
        updateReading,
        updateReadingNotes,
        updateReadingTitle,
        fetchDeck,
        fetchSpread,
        fetchCardsInSpread,
        uploadData,
        updateUserInfo
    };
};

export default useFirestore;
