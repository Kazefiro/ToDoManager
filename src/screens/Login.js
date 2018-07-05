import React, { Component } from 'react';
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, View, Image, TextInput, Button, Text, Alert } from 'react-native';
// import { signInOnFirebaseAsync } from '../services/FirebaseApi';
const img = require('../assets/TodoList.png');

export default class Login extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            email: props.email
        };
    }

    // onTextChanged(text) {
    //     this.setState({ email: text });
    // }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container}
                    behavior='padding'>
                    <View style={styles.topView}>
                        <Image style={styles.img} source={img} />
                    </View>
                    <View style={styles.bottomView}>
                        <TextInput style={styles.input}
                            value={this.state.email}
                            placeholder='Email'
                            keyboardType={'email-address'}
                            autoCapitalize='none'
                            onChangeText={(text) => this.setState({ email: text })} />
                        <TextInput style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })} />
                        <Button title='Sign In'
                            onPress={async () => await this.signInAsync()} />
                        <View style={styles.textConteiner}>
                            <Text>Not a member? Let's </Text>
                            <Text style={styles.textRegister}
                                onPress={() => this.props.navigation.navigate('pageRegister')}
                                >
                                
                                Register
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    async signInAsync(){
        try{
            const user = await signInOnFirebaseAsync(
                this.state.email,
                this.state.password
            );

            const message = `User ${user.email} authenticated`;
            Alert.alert('Login Sucessful', message);
        }catch(error){
            Alert.alert('Login Failed', error.message);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    }
});