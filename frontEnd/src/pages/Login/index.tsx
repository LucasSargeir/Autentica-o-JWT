import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler';
import {useAuth} from '../../contexts/auth'

function Login() {

	const { signed, user, signIn } = useAuth();

	const [email, setEmail] =  useState("")
	const [senha, setSenha] =  useState("")

//	console.log(signed);
//	console.log(user)

	async function handleNavigateLogin(){

		await signIn({email, senha});

	}

	return (
    	<View style={styles.container}>
		<View style={styles.boxComponent}>
    		<Text style={styles.textComponent}>Faça Login</Text>
			<Text>{'\n'}você não pode seguir sem fazer login</Text>
		</View>
    	<View style={styles.boxComponentForm}>

			<Text style={styles.textInput}>E-mail</Text>
			<TextInput style={styles.input} onChangeText={setEmail}/>			

			<Text style={styles.textInput}>Senha</Text>
			<TextInput style={styles.input} onChangeText={setSenha}/>

        	<RectButton style={styles.buttonComponent} onPress={handleNavigateLogin}>
        		<Text style={styles.textButtonComponent}>Entrar</Text>
        	</RectButton>
        </View>
    </View>
	);

}

export default Login;