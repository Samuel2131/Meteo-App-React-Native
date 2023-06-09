import React from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import ToggleButton from '../Components/Toggle';
import {Theme} from '../Utils/Colors';
import { render } from 'react-dom';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { check} from '../Utils/UtilsObject';
import { playButton } from '../Utils/Sound';

const actions = [{action:'Dark Mode',key:0,},{action:'Sfondi',key:1,},{action:'Sfondi Animati',key:2},{action:'Temperatura in °F',key:3},{action:'Velocità vento in nodi',key:4},{action:'Previsioni ogni 6 ore',key:5}];

export default class Options extends React.Component{
  componentDidMount(){
    if(!check.controlSound){
      playButton();
      check.setControlSound(true);
    }
  }
  update = () =>{
    this.forceUpdate();
  }
 render(){ 
    return (
      <View style={[styles.container,{backgroundColor:Theme.theme.dark? DarkTheme.colors.background : DefaultTheme.colors.background}]}>
          <Text style={[styles.styleText,{color:Theme.theme.dark ? DarkTheme.colors.text : DefaultTheme.colors.text},{alignSelf:'center'}]}>Impostazioni</Text>
          <FlatList
          data={actions}
          renderItem={({item}) => <ToggleButton buttonFunction={item.action} update={this.update} colortext={Theme.theme.dark ? DarkTheme.colors.text : DefaultTheme.colors.text} />}
          ItemSeparatorComponent={()=><View style={[styles.styleSeparator,{backgroundColor:!Theme.theme.dark ? DarkTheme.colors.background : DefaultTheme.colors.background}]} />}
          ListHeaderComponent={()=><View style={[styles.styleSeparator,{backgroundColor:!Theme.theme.dark ? DarkTheme.colors.background : DefaultTheme.colors.background}]} />}
          ListFooterComponent={()=><View style={[styles.styleSeparator,{backgroundColor:!Theme.theme.dark ? DarkTheme.colors.background : DefaultTheme.colors.background}]} />}
          keyExtractor={(item) => item.key.toString()}
          /> 
      </View>
    );
 }
}

const styles = StyleSheet.create({
  container:{
      flex:1,
  },
  styleText:{
      fontSize:28,
      fontStyle:'italic',
  },
  styleSeparator:{
    height: 1,
    width: "100%",
    margin: 10,
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 1,
    shadowRadius: 7.49
   }
});