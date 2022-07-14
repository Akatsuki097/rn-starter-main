import React from "react";
import { Text,StyleSheet,View } from "react-native";



const App = () =>{
    const greet ='Stephen' ;
    return(
       <View>
        <Text style={styles.textStyle}> Getting Started with React-Native </Text>
        <Text style= {styles.textStyle2}>My name is {greet}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle :{
        fontSize: 45
    },
    textStyle2 :{
        fontSize : 20 
    }

});


export default App;