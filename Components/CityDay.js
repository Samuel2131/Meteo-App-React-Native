import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from './Icon';
import {conversionC_F, defaultStyle } from '../Utils/UtilsObject';
import { playButton } from '../Utils/Sound';

const setDay = (day) =>{
  const days = ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
  return days[day];
}
const setMounth = (mounth) =>{
  const mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  return mesi[mounth-1];
}
export default class Day extends React.Component{
 navigation = (newItem) =>{
    playButton();
    this.props.navigation.navigate('SingleDay',newItem);
 }
 Forecast = (newItem,ora,dayOfWeek,dayOfMounth,Temp) =>{
   if(defaultStyle.date.forecast==6){
     if(this.props.indice%2==0){
      return(
        <TouchableOpacity activeOpacity={0.7} style={Style.Container} onPress={() => this.navigation(newItem)}>
          <View style={Style.StyleViewImage}>
          <Text style={Style.StyleText}>{ora}</Text>
          <Icon url={`http://openweathermap.org/img/wn/${this.props.date.list[this.props.indice].weather[0].icon}@2x.png`} />
          </View>
          <View style={Style.StyleDay}>
              <Text style={Style.StyleText}>{dayOfWeek} {dayOfMounth}</Text>
          </View>
          <View style={Style.StyleTemp}>
              <Text style={Style.StyleText}>{defaultStyle.date.temp==='C' ? Temp.toFixed(0) : conversionC_F(Temp).toFixed(0)}°  {defaultStyle.date.temp==='C' ? Temp.toFixed(0) : conversionC_F(Temp).toFixed(0)}°</Text>
          </View>
        </TouchableOpacity>
      )
    }else{
     return(<View></View>);
    }
  }
  else return(
    <TouchableOpacity activeOpacity={0.7} style={Style.Container} onPress={() => this.navigation(newItem)}>
          <View style={Style.StyleViewImage}>
          <Text style={Style.StyleText}>{ora}</Text>
          <Icon url={`http://openweathermap.org/img/wn/${this.props.date.list[this.props.indice].weather[0].icon}@2x.png`} />
          </View>
          <View style={Style.StyleDay}>
              <Text style={Style.StyleText}>{dayOfWeek} {dayOfMounth}</Text>
          </View>
          <View style={Style.StyleTemp}>
              <Text style={Style.StyleText}>{defaultStyle.date.temp==='C' ? Temp.toFixed(0) : conversionC_F(Temp).toFixed(0)}°  {defaultStyle.date.temp==='C' ? Temp.toFixed(0) : conversionC_F(Temp).toFixed(0)}°</Text>
          </View>
     </TouchableOpacity>     
  )
}
 DayFunction = (props) =>{
    var date = new Date (props.date.list[props.indice].dt_txt.substr(0,10));
    const mounth = props.date.list[props.indice].dt_txt.substr(5,2);
    const Temp = Math.floor(props.date.list[props.indice].main.temp_min-273.15);
    const dayOfMounth = props.date.list[props.indice].dt_txt.substr(8,2);
    const dayOfWeek = setDay(date.getDay());
    const ora = props.date.list[props.indice].dt_txt.substr(11,2);
    const newItem = {calendar:(dayOfWeek + ' ' + dayOfMounth + ' ' + setMounth(mounth)),
                            hour:ora,
                            name:props.date.city.name,
                            temp:Math.floor(props.date.list[props.indice].main.temp-273.15),
                            humidity:props.date.list[props.indice].main.humidity,
                            pop:props.date.list[props.indice].pop,
                            visibility:props.date.list[props.indice].visibility,
                            pressure:props.date.list[props.indice].main.pressure,
                            wind:props.date.list[props.indice].wind.speed,
                            imageBackground:props.ImageBackground,
                            description:props.date.list[props.indice].weather[0].description,
                            cloud:props.date.list[props.indice].clouds.all,
                            indice:props.indice};  
      const forecast = this.Forecast(newItem,ora,dayOfWeek,dayOfMounth,Temp);                     
    return(
      <View>
      {forecast}
      </View>
    );
}
render(){
  return(this.DayFunction(this.props));
}
}
const Style = StyleSheet.create({
    Container:{
       flex:1,
       flexDirection:'row',
       width:'100%',
       height:45,
       alignItems:'center',
       justifyContent:'center',
    },
    StyleViewImage:{
      position:'absolute',
      start:Dimensions.get('window').height > 750 ? 14 : 10,
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
    },
    
    StyleDay:{
      position:'absolute',
      start:Dimensions.get('window').height > 750 ? 140 : 110,
      alignItems:'center',
      justifyContent:'center'
    },
    StyleTemp:{
      position:'absolute',
      end:28,
      alignItems:'center',
      justifyContent:'center'
    },
    StyleText:{
      fontSize:Dimensions.get('window').height > 750 ? 21 : 17,
      fontStyle:'italic',
      color:'white',
      textShadowColor: "black",
      fontWeight:'700',
      shadowOffset: {
       width: 0,
       height: 0,
     },
      shadowOpacity: 2,
      shadowRadius: 2,
     }
  });