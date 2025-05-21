import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useAuth, useFirestore } from '../../hooks';

import QuickNav from 'src/navigation/quickNav';
import { ROUTES } from '../../navigation/config';
import { ShuffleDeal } from 'ui';
import useDealer from '../../hooks/useDealer';
import { useRouter } from 'solito/router';

const ShuffleDealScreen = ({ navigation }) => {
    const [documentId, setDocumentId] = useState<string>();
    const { push } = useRouter();
    const { dealer, cardMeanings, spread } = useDealer();

    const { fetchCardsInSpread, generateReadingDocument, updateReading } = useFirestore();

    const { user } = useAuth();

    useEffect(() => {
        if (user?.uid) {
            generateReadingDocument(user.uid)
                .then(docID => {
                    if (docID) {
                        setDocumentId(docID);
                    }
                })
                .catch(e => {
                    console.log('error ', e);
                });
        }
    }, [user]);

    const getCards = async (readingIndexes, reversals) =>
        fetchCardsInSpread(readingIndexes, reversals).then(c => c);

    const updateReadingDoc = async (reading, reversals) => {
        if (user?.uid && documentId && reading && reversals) {
            await updateReading(documentId, reading, reversals);
            dealer(documentId);
        }
    };

    const openReading = (index: number) => {
        if (cardMeanings) {
            push({
                pathname: ROUTES.screens.READING_DETAIL.path,
                query: { reading: JSON.stringify(cardMeanings), startFrom: index }
            });
        }
    };

    const quickNavEvent = isOpen => {
        navigation.setOptions({ headerShown: !isOpen });
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ShuffleDeal
                    getCards={getCards}
                    spread={spread}
                    addDealtReading={updateReadingDoc}
                    openReading={openReading}
                />
            </SafeAreaView>
            <QuickNav navigationEvent={quickNavEvent} />
        </>
    );
};

export default ShuffleDealScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
