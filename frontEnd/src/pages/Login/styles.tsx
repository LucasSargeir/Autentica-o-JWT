import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxComponent:{
      flex: 2,
      width: "100%",
      alignItems:"center",
      justifyContent: "center",
    },
    boxComponentForm:{
      flex: 3,
      width: "100%",
      justifyContent: "flex-start",
      alignItems:"center"
    },
    textComponent:{
      fontSize:25,
    },
    buttonComponent:{
      backgroundColor: "#34AA00",
      width: 200,
      paddingVertical:25,
      alignItems:"center",
      borderRadius: 8,
      marginTop: 15
    },
    textButtonComponent:{
      fontSize:15,
      fontWeight: "bold",
      color: "#FFF"
    },
    input:{
      backgroundColor: "#f5f5f0",
      margin: 5,
      height: 50,
      borderRadius: 8,
      width: 200
    },
    textInput:{
      fontSize: 15,
      marginVertical: 5
    }
});
  
export default styles;