import { Background, Deal } from 'ui';
import { SafeAreaView, StyleSheet } from 'react-native';

import QuickNav from 'src/navigation/quickNav';
import { ROUTES } from '../../navigation/config';
import React from 'react';
import useDealer from '../../hooks/useDealer';
import { useRouter } from 'solito/router';

const ReadingScreen = ({ navigation, route }) => {
    const { dealer, cardMeanings } = useDealer();
    const id = route?.params?.id;
    dealer(id);

    const { push } = useRouter();

    const openReadingDetail = spreadIndex => {
        push({
            pathname: ROUTES.screens.READING_DETAIL.path,
            query: {
                reading: JSON.stringify(cardMeanings),
                startFrom: spreadIndex
            }
        });
    };

    const quickNavEvent = isOpen => {
        navigation.setOptions({ headerShown: !isOpen });
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Background>
                    {cardMeanings && (
                        <Deal
                            reading={cardMeanings}
                            dealt={true}
                            onPress={openReadingDetail}
                        />
                    )}
                </Background>
            </SafeAreaView>
            <QuickNav navigationEvent={quickNavEvent} />
        </>
    );
};

export default ReadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
