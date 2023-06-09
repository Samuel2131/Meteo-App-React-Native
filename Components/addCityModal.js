import React from 'react';
import {Modal, StyleSheet, TextInput, View, TouchableWithoutFeedback, Keyboard, Dimensions, Platform} from 'react-native';
import ButtonAdd from './ButtonAdd';
import {Theme} from '../Utils/Colors'
import { Entypo } from '@expo/vector-icons'
import { render } from 'react-dom';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';

 if(Platform.OS === 'ios'){
  if(Dimensions.get('window').height<600) distance = '20%';
  else distance = '30%';
}
else{
  if(Dimensions.get('window').height<600) distance = '8%';
  else distance = '20%';
}

const deleteTastiera = () =>{
  return Keyboard.dismiss();
}

export default class AddCityModal extends React.Component{
  state={
    date:{
      mode:0,
      background:false,
      backgroundAnimated:true,
      unitTemp:'C',
    },
  }
 render(){
    return(
      <GestureRecognizer onSwipeDown={this.props.notVisible} >
        <Modal animationType='slide' transparent={true} visible={this.props.visible} >
          <TouchableWithoutFeedback onPress={deleteTastiera}>
          <View style={[styles.centeredView,styles.modalView,{backgroundColor:Theme.theme.dark ? DarkTheme.colors.background : DefaultTheme.colors.background}]}>  
          <View style={{flexDirection:'row',marginTop:75,alignItems:'center',justifyContent:'center'}}>
          <View style={[styles.inputView,{borderColor:Theme.theme.dark ? DarkTheme.colors.text : DefaultTheme.colors.text}]}> 
          <Entypo name="magnifying-glass" size={24} style={styles.imageStyle} color={Theme.theme.dark ? DarkTheme.colors.text : DefaultTheme.colors.text} />
          <TextInput placeholder='Cerca città... ' keyboardType='default' placeholderTextColor='grey' value={this.props.textValue} onChangeText={this.props.myChangeText} style={[styles.inputStyle,{color:Theme.theme.dark ? DarkTheme.colors.text : DefaultTheme.colors.text}]}/>
          </View>
          <ButtonAdd 
          title='+' 
          addModal={this.props.addModal} 
          deleteModal={this.props.notVisible} 
          addCity={this.props.addCity} 
          prova={false} 
          metodo={2}
          myMargin={0}
          rotate={{rotate:'0deg'}}
          width={50}
          height={50}
          />
          </View>
          <View style={styles.buttonBackStyle}>
           <ButtonAdd 
           title='+' 
           position='absolute'
           addModal={this.props.addModal} 
           deleteModal={this.props.notVisible} 
           addCity={this.props.addCity} 
           prova={true} 
           metodo={1}
           myMargin={Dimensions.get('window').height>700 ? 550 : 300}
           rotate={{rotate:'45deg'}}
           width={55}
           height={55}
           />
          </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
       </GestureRecognizer> 
    )
  }
}

const styles = StyleSheet.create({
    centeredView: {
        flex:1,
        width:'100%',
        marginTop:Dimensions.get('screen').height>900 ? '5%' : '12%',
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
      },
      modalView: {
        padding: 30,
      },
      inputView:{
        flexDirection:'row',
        width:'85%',
        borderWidth:2,
        borderRadius:25,
      },
      imageStyle:{
        padding: 10,
        alignSelf:'center',
        justifyContent:'center'
      },
      inputStyle:{
        width:'80%',
        margin:15,
      },
      buttonBackStyle:{
        position:'absolute',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        marginTop:Dimensions.get('screen').height > 700 ? '110%' : '90%',
      },
      textStyle2:{
        position:'relative',
        marginBottom:18,
        fontSize:35,
        bottom:'5%',
      },
});