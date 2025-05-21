import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ReadingProp } from 'ui/types';
import { fetchSpreads } from 'src/redux/spreadSlice';
import useFirestore from './firebase/use-firestore';
import { useReading } from 'ui';

const useDealer = () => {
    const [spread, setSpread] = useState<FirebaseFirestoreTypes.DocumentData>();
    const [cards, setCards] = useState<ReadingProp[]>();
    const [cardMeanings, setCardMeanings] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { value: spreads } = useSelector((state: RootState) => state.spreads);

    const { fetchReadingById, fetchCardsInSpread } = useFirestore();
    const { deal } = useReading();

    useEffect(() => {
        dispatch(fetchSpreads());
    }, [dispatch]);

    useEffect(() => {
        if (spreads) {
            setSpread(spreads[0]);
        }
    }, [spreads]);

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
        spread,
        dealer
    };
};

export default useDealer;
