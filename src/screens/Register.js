import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, KeyboardAvoidingView, View, Image, Text, TextInput, Button, Alert } from 'react-native';
import  { createUserOnFirebase } from '../services/FirebaseApi';
import { NavigationActions } from 'react-navigation';
const img = require('../assets/TodoList.png');

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                    <View style={styles.topView}>
                        <Image style={styles.img} source={img} />
                        <Text style={styles.title}>Registering new user</Text>
                    </View>
                    <View style={styles.bottomView}>
                        <TextInput style={styles.input}
                            placeholder='Email'
                            keyboardType={'email-address'}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({ email })} />
                        <TextInput style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })} />
                        <Button title='Register User'
                            onPress={async () => await this.createUserAsync()} />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    async createUserAsync(){
        try {
            const user = await createUserOnFirebase(this.state.email, this.state.password);
            const message = `User ${user.email} has been created!`;
            Alert.alert('User Created', message, [
                {
                    text: 'Done', onPress: () => {
                        const backAction = NavigationActions.back();
                        this.props.navigation.dispatch(backAction)
                    }
                }
            ]);
        } catch (error){
            Alert.alert('Error creating user', error.message);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    topView: {
        flex: 0.20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25
    },
    img: {
        width: 50,
        height: 50
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    bottomView: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    }
});