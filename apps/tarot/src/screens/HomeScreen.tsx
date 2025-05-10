import { Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native';

import { Background } from 'ui';
import React from 'react';

const { height: screenHeight } = Dimensions.get('window');

const height = screenHeight;
const width = screenHeight * 0.707;


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const HomeScreen = () => (
        <SafeAreaView style={styles.container}>
            <Background>
                <Image
                    style={{ width, height }}
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('ui/assets/images/Tree_Of_Life.jpg')}
                />
            </Background>
        </SafeAreaView>
    );

export default HomeScreen;

