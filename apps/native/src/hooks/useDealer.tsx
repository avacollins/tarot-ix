import { useEffect, useState } from 'react';

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ReadingProp } from 'ui/types';
import useFirestore from './firebase/use-firestore';
import { useReading } from 'ui';

const useDealer = () => {
    const [spread, setSpread] = useState<FirebaseFirestoreTypes.DocumentData>();
    const [cards, setCards] = useState<ReadingProp[]>();
    const [cardMeanings, setCardMeanings] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { fetchReadingById, fetchSpread, fetchCardsInSpread } = useFirestore();
    const { deal } = useReading();

    useEffect(() => {
        const fetch = async () => {
            fetchSpread().then((s: FirebaseFirestoreTypes.DocumentData) => setSpread(s));
        };
        fetch();
    }, []);

    useEffect(() => {
        if (cards) {
            const d = deal({ cards, spread });
            setCardMeanings(d);
        }
    }, [cards]);

    const getCards = async (readingIndexes, reversals) =>
        fetchCardsInSpread(readingIndexes, reversals).then(c => c);

    const getReading = async id => fetchReadingById(id).then(r => r);

    const dealer = async id => {
        if (id && !isLoading) {
            setIsLoading(true);
            const data = await getReading(id);
            if (data) {
                const c = await getCards(data.reading, data.reversals);
                if (c) {
                    setCards(c);
                }
            }

            return;
        }
    };

    return {
        cardMeanings,
        dealer
    };
};

export default useDealer;
