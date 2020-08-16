import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxComponent:{
      flex: 1,
      justifyContent: "center",
    },
    textComponent:{
      fontSize:25,
    },
    buttonComponent:{
      backgroundColor: "#4499ff",
      width: 200,
      paddingVertical:25,
      alignItems:"center",
      borderRadius: 8
    },
    textButtonComponent:{
      fontSize:15,
      fontWeight: "bold",
      color: "#FFF"
    }
});
  
export default styles;