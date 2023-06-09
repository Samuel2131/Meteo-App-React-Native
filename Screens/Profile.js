import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Theme } from '../Utils/Colors';
import { render } from 'react-dom';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { check, defaultStyle, savedCities, visitedCity } from '../Utils/UtilsObject';
import { playButton } from '../Utils/Sound';
import { FlatList } from 'react-native-gesture-handler';
import TouchableDate from '../Components/TouchableDate';

let background = null;

export default class Profile extends React.Component {
  componentDidMount(){
    if(!check.controlSound){
      playButton();
      check.setControlSound(true);
    }
  this.pushDate();
  }
  state ={
    date:[],
    controlUpdate:{
      savedCities:savedCities.city.arrayCity,
      visitedCity:visitedCity.city,
      Theme:Theme.theme,
      defaultStyle:defaultStyle.date,
    },
  }
  pushDate = () =>{
    if(!defaultStyle.date.backgroundOn){
      if(!defaultStyle.date.backgroundAnimatedOn)background = 'Nessuno Sfondo';
      else background = 'Sfondi Animati';
   }
   else background = 'Sfondi Statici';
   const newDate = [];
    const item1 = {
      title:'Città Preferite',
      description:['Città nei preferiti : '+savedCities.city.arrayCity.length,'Ultima città aggiunta : '+savedCities.city.arrayCity[savedCities.city.arrayCity.length-1],null,null],
      key:1
    }
    const item2 = {
      title:'Città visitate',
      description:['Numero città visitate : '+visitedCity.city.length,'Città visitata più volte : '+visitedCity.searchMaxCounter(),null,null],
      key:2
    }
    const item3 = {
      title:'Preferenze',
      description:['Tema Attivo : '+(Theme.theme.dark ? 'Dark Mode' : 'Light Mode'),'Tipo di sfondi attivo : '+background,'Unità di misura della temperatura : '+defaultStyle.date.temp,'Unità di misura del vento : '+defaultStyle.date.wind],
      key:3
    }
    newDate.push(item1);
    newDate.push(item2);
    newDate.push(item3);
    this.setState({date:newDate});
  }
  render(){ 
    return (
     <View style={[styles.container,{backgroundColor:Theme.theme.dark ? DarkTheme.colors.background : DefaultTheme.colors.background}]} onTouchStart={this.pushDate}>
      <Text style={[styles.styleText,{color:Theme.theme.dark ? DarkTheme.colors.text : DefaultTheme.colors.text}]}>Utilizzo dell'App</Text> 
       <FlatList 
        data={this.state.date}
        renderItem={(item)=> <TouchableDate date={item} indice={item.index} colorText={Theme.theme.dark ? DarkTheme.colors.text : DefaultTheme.colors.text} />}
        keyExtractor={(item) => item.key.toString()}
        style={{width:'90%'}}
       />
     </View>
    );
 }
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      alignItems:'center',
  },
  styleText:{
      fontSize:24,
      fontStyle:'italic',
      margin:15,
  },
  styleTextTouchable:{
    fontSize:18,
    fontStyle:'italic',
    marginLeft:32,
  },
  styleView:{
    position:'absolute',
    textShadowColor: "black",
    fontWeight:'700',
    shadowOffset: {
     width: 2,
     height: 4,
   },
    shadowOpacity: 2,
    shadowRadius: 2,
    width:'90%',
    height:'22%',
    margin:75,
    borderRadius:20,
  }
});