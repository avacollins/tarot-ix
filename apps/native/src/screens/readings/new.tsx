import { SafeAreaView, StyleSheet } from 'react-native';

import QuickNav from 'src/navigation/quickNav';
import { ROUTES } from '../../navigation/config';
import React from 'react';
import { Start } from 'ui';
import { useRouter } from 'solito/router';

const NewReading = () => {
    const { push } = useRouter();

    const onStart = () => {
        push({ pathname: ROUTES.screens.SHUFFLE_DEAL.path });
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Start onStart={onStart} />
            </SafeAreaView>
            <QuickNav />
        </>
    );
};

export default NewReading;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
