import { Dimensions, StyleSheet, View } from 'react-native';

import { default as Colors } from './colors';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';

const viewWidth = Dimensions.get('window').width;
const viewHeight = Dimensions.get('window').height;

type BackgroundProps = {
    children: ReactNode
}

const Background = ({ children }: BackgroundProps) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            width: viewWidth,
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: Colors.silver_sand.base
        },
        background: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 500,
            paddingTop: viewHeight - 500,
            zIndex: 1
        },
        bottom: {
            position: 'absolute',
            bottom: -500,
            width: viewWidth,
            height: 600,
            backgroundColor: Colors.spanish_gray.base,
            zIndex: 0
        },
        foreground: {
            zIndex: 10
        }
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.silver_sand.base, Colors.spanish_gray.base]}
                locations={[0, 0.55]}
                style={styles.background}
            />
            <View style={styles.bottom} />
            <View style={styles.foreground}>{children}</View>
        </View>
    );
};

export default Background;
