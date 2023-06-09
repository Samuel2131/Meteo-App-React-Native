import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image } from 'react-native';

const ButtonAdd = (props) =>{
    const imagePlus = require('../img/ButtonImg.png');
    const position = props.position;
    const prova = props.prova;
    const color = prova ? 'red' : '#00bfff';
    const metodo = props.metodo;
    const myRotate = props.rotate;
    const myMargin = props.myMargin;
    const width = props.width;
    const height = props.height;
    press = () => console.warn('Errore');
    switch(metodo){
        case 0:press = props.addModal;
        break;
        case 1:press = props.deleteModal;
        break;
        case 2:press = props.addCity;
        break;
        case 3:press = props.setVisible;
        break;
        }
    return (
     <TouchableOpacity activeOpacity={0.5} style={[styles.buttonAdd,{position:position},{backgroundColor:color},{width:width},{height:height},{marginTop:myMargin},{transform:[myRotate]}]} onPress={press}> 
     <View>
        <Image source={imagePlus} style={[styles.imageStyle,{width:width/2},{height:height/2}]}  />
     </View> 
     </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imageStyle:{
        tintColor:'white',
    },
    buttonAdd:{
      marginLeft:10,
      alignItems:'center',
      justifyContent:'center',
      padding:15,
      borderRadius:30,
    },
});

export default ButtonAdd;
