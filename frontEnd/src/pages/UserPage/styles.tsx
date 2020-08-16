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
  boxComponentContainer:{
    flex: 1,
    flexDirection: "row",
    alignItems:"flex-start"
  },
  buttonComponent:{
    paddingVertical:25,
    width: 150,
    alignItems:"center",
    borderRadius: 8,
    margin:5
  },
  textButtonComponent:{
    fontSize:15,
    fontWeight: "bold",
    color: "#FFF"
  },
  colorRed:{
    backgroundColor: "#992200",
  },
  colorBlue:{
    backgroundColor: "#4499ff",
  }
});
  
export default styles;