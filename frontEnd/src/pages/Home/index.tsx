import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';;

function Home() {

	const navigation = useNavigation();

	function handleNavigateFromHome(){

		navigation.navigate('UserPage');

	}

    return (
    <View style={styles.container}>
		<View style={styles.boxComponent}>
    		<Text style={styles.textComponent}>Página Inicial</Text>
		</View>
    	<View style={styles.boxComponent}>
        	<RectButton style={styles.buttonComponent}>
        	<Text style={styles.textButtonComponent} onPress={handleNavigateFromHome}>Seu perfil</Text>
        	</RectButton>
        </View>
    </View>
  );

}

export default Home;