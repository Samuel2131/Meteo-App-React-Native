import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Theme } from '../Utils/Colors';

export default class TouchableDate extends React.Component {
 render(){
  return (
   <TouchableOpacity activeOpacity={0.7} style={[styles.styleView,{marginTop:this.props.indice==0 ? 30 : 60},{marginBottom:this.props.indice==2 ? 50 : 0},{backgroundColor:Theme.theme.dark ? '#3C3C3C' : 'white'},{borderColor:Theme.theme.dark ? null : Theme.theme.colors.text}]}>
           <Text style={[styles.styleTextTouchable,{alignSelf:'center'},{color:this.props.colorText},{marginLeft:0},{marginTop:2}]}>{this.props.date.item.title}</Text>
             <Text style={[styles.styleTextTouchable,{margin:8},{color:this.props.colorText}]}>{this.props.date.item.description[0]}</Text>
             <Text style={[styles.styleTextTouchable,{margin:8},{color:this.props.colorText}]}>{this.props.date.item.description[1]}</Text>
             <Text style={[styles.styleTextTouchable,{margin:this.props.indice==2 ? 8 : 0},{color:this.props.colorText}]}>{this.props.date.item.description[2]}</Text>
             <Text style={[styles.styleTextTouchable,{margin:this.props.indice==2 ? 8 : 0},{color:this.props.colorText}]}>{this.props.date.item.description[3]}</Text>             
    </TouchableOpacity>
  ) 
  } 
}

const styles = StyleSheet.create({
    styleText:{
        fontSize:24,
        fontStyle:'italic',
        margin:15,
    },
    styleTextTouchable:{
      fontSize:18,
      fontStyle:'italic',
      marginLeft:18,
    },
    styleView:{
      flex:1,
      borderWidth:1,
      width:'100%',
      borderRadius:20,
    }
});