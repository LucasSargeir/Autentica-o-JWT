import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler';
import {useAuth} from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

function UserPage() {

	const navigation = useNavigation();

	function handleNavigateForHome(){

		navigation.navigate('Home');

	}

	const { user, signOut } = useAuth();


	function handleNavigateLogout(){
		signOut();
	}

	return (
		<View style={styles.container}>
			<View style={styles.boxComponent}>
				<Text style={styles.textComponent}>Bem vindo a página Inicial{user && `\n${user.nome}`}</Text>
			</View>
			<View style={styles.boxComponentContainer}>
				<RectButton style={[styles.buttonComponent,styles.colorBlue]} onPress={handleNavigateForHome}>
					<Text style={styles.textButtonComponent}>Home</Text>
				</RectButton>
				<RectButton style={[styles.buttonComponent,styles.colorRed]} onPress={handleNavigateLogout}>
					<Text style={styles.textButtonComponent}>Sair</Text>
				</RectButton>
			</View>
		</View>
	);

}

export default UserPage;