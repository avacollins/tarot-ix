import { Avatar, Button, Text } from '@rneui/themed';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { default as Colors } from '../../theme/colors';
import { Value } from '../../theme/fonts';

type AccountProps = {
    username: string;
    logout: () => void;
    resetPassword: () => void;
};

const { width, height } = Dimensions.get('window');

const Account = ({ username, logout, resetPassword }: AccountProps) => {
    const [isAnon, setAnon] = useState(false);

    useEffect(() => {
        if (username) {
            if (username.split('@')[1] === 'anon.com') {
                setAnon(true);
            }
        }
    }, [username]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar
                        size={254}
                        rounded={true}
                        source={{ uri: 'https://loremflickr.com/320/240/tarot' }}
                    />
                </View>
                <Text style={styles.username}>{username}</Text>
                {isAnon && (
                    <>
                        <Text style={styles.passwordInfo}>
                            Your anonymous login comes with the randomly generated email
                            address above and the password:
                            <Text style={styles.password}>&nbsp;anonymous</Text>
                        </Text>
                    </>
                )}
                {!isAnon && (
                    <Button
                        title="Reset password"
                        type="clear"
                        buttonStyle={{ height: 60 }}
                        titleStyle={styles.password}
                        onPress={resetPassword}
                    />
                )}
                <View style={styles.logoutButtonWrapper}>
                    <Button
                        title="Logout"
                        buttonStyle={styles.logoutButton}
                        titleStyle={styles.logoutTitle}
                        onPress={logout}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height - 100,
        alignItems: 'center',
        marginHorizontal: 40
    },
    avatar: {
        marginTop: 100
    },
    username: {
        fontSize: Value(16),
        marginVertical: 20
    },
    passwordInfo: {
        fontSize: Value(16),
        lineHeight: Value(20),
        fontStyle: 'italic',
        fontWeight: 'normal',
        color: Colors.smoky_black.base
    },
    password: {
        fontSize: Value(18),
        fontWeight: '600',
        color: Colors.smoky_black.accent2
    },
    passwordButton: {},
    logoutButtonWrapper: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginVertical: 100
    },
    logoutButton: {
        alignSelf: 'stretch',
        height: 60,
        width: width - 80
    },
    logoutTitle: {
        paddingHorizontal: 40
    }
});
