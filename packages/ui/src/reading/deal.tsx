import React, { useState } from 'react';

import DealCard from './deal-card';
import { ReadingProp } from '../../types';
import TheSpread from './the-spread';

type DealProps = {
    reading: ReadingProp[];
    dealt?: boolean;
    onPress: (spreadIndex: number) => void;
};

const POSITIONS = Array.from(Array(10).keys());

export default function Deal({ reading, dealt = false, onPress }: DealProps) {
    const [dealtCards, setDealtCards] = useState(POSITIONS);
    const [dealDone, setDealDone] = useState(dealt);

    const castEnergyToDeck = (index: number) => {
        if (!dealDone) {
            for (let i = 0; i < 10; i++) {
                const updated = dealtCards.filter(item => item !== i);
                setDealtCards(updated);
            }
            setDealDone(true);
        }
        if (dealtCards.length === 0 || !!dealDone) {
            onPress(index);
        }
    };

    return (
        <TheSpread>
            {reading &&
                reading.map((card, index) => (
                    <DealCard
                        key={index}
                        card={card}
                        cardIndex={card?.index}
                        spreadIndex={index}
                        reversed={card.reversed}
                        onPress={() => castEnergyToDeck(index)}
                        dealt={dealDone}
                    />
                ))}
        </TheSpread>
    );
}
