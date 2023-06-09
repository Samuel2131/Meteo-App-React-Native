import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Alert, Dimensions} from 'react-native';
import {defaultColor, Theme} from '../Utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { defaultStyle } from '../Utils/UtilsObject';
import { backButton, playButton } from '../Utils/Sound';

export default class ToggleButton extends React.Component{
  componentDidMount(){
   AsyncStorage.getItem('StyleApp').then((date)=>{
     var JsonDate = JSON.parse(date);
     const choice = this.switchActions();
     switch (choice) {
       case 1:
        this.setState({on:Theme.theme.dark ? true : false});
        this.setState({left:Theme.theme.dark ? 32 : 0});
       break;
       case 2:
        this.setState({on:JsonDate.backgroundOn===false ? false : true});
        this.setState({left:JsonDate.backgroundOn===false ? 0 : 32});
       break;
       case 3:
        this.setState({on:JsonDate.backgroundAnimatedOn===false ? false : true});
        this.setState({left:JsonDate.backgroundAnimatedOn===false ? 0 : 32});
       break;
       case 4:
        this.setState({on:JsonDate.temp==='C' ? false : true});
        this.setState({left:JsonDate.temp==='C' ? 0 : 32});
       break; 
       case 5:
        this.setState({on:JsonDate.wind==='km/h' ? false : true});
        this.setState({left:JsonDate.wind==='km/h' ? 0 : 32});
       break;
       case 6:
        this.setState({on:JsonDate.forecast===3 ? false : true});
        this.setState({left:JsonDate.forecast===3 ? 0 : 32});  
        break;
       default:
         break;
     }
   })
  }
  state = {
    on:false,
    left:0,
    StyleMode:this.props.colortext,
  }
    switchActions = () =>{
      switch (this.props.buttonFunction) {
        case 'Dark Mode':
          return 1;
          break;
         case 'Sfondi':
          return 2;
          break;
          case 'Sfondi Animati':
          return 3;
          break;
          case 'Temperatura in °F':
          return 4;  
          break;
          case 'Velocità vento in nodi':
          return 5;
          break;  
          case 'Previsioni ogni 6 ore':
          return 6;
          break;
          default:
          return 0;
          break;  
      }
    }
    setMode = () =>{
      if(!this.state.on){
        this.setState({on:true})
        this.setState({left:32})
        AsyncStorage.setItem('Theme',JSON.stringify(DarkTheme));
        Theme.setTheme(DarkTheme);
        playButton();
      }
      else{
        this.setState({on:false})
        this.setState({left:0})
        AsyncStorage.setItem('Theme',JSON.stringify(DefaultTheme));  
        Theme.setTheme(DefaultTheme);
        backButton();
      }
    }
    setBackground = () =>{
      if(!this.state.on){
       if(defaultStyle.date.backgroundAnimatedOn)Alert.alert('Attenzione!','Rimuovi prima gli sfondi animati!');
       else{ 
        const newDate ={
            backgroundOn:true,
            backgroundAnimatedOn:false,
            temp:defaultStyle.date.temp,
            wind:defaultStyle.date.wind,
            forecast:defaultStyle.date.forecast,
        }
        this.setState({on:true})
        this.setState({left:32})
          AsyncStorage.setItem('StyleApp',JSON.stringify(newDate));
          defaultStyle.setDate(newDate);
          playButton();
        }   
      }
      else{
        const newDate ={
            backgroundOn:false,
            backgroundAnimatedOn:defaultStyle.date.backgroundAnimatedOn,
            temp:defaultStyle.date.temp,
            wind:defaultStyle.date.wind,
            forecast:defaultStyle.date.forecast,
      }
        this.setState({on:false})
        this.setState({left:0})
          AsyncStorage.setItem('StyleApp',JSON.stringify(newDate));
          defaultStyle.setDate(newDate);
          backButton();
      }
    }
    setBackgroundAnimated = () =>{
      if(!this.state.on){
        if(defaultStyle.date.backgroundOn)Alert.alert('Attenzione!','Rimuovi prima gli sfondi statici!');
        else{
        const newDate = {
          backgroundOn:false,
          backgroundAnimatedOn:true,
          temp:defaultStyle.date.temp,
          wind:defaultStyle.date.wind,
          forecast:defaultStyle.date.forecast,
        }
        this.setState({on:true})
        this.setState({left:32})
          AsyncStorage.setItem('StyleApp',JSON.stringify(newDate));
          defaultStyle.setDate(newDate);
          playButton();
        }  
      }
      else{
        const newDate = {
          backgroundOn:defaultStyle.date.backgroundOn,
          backgroundAnimatedOn:false,
          temp:defaultStyle.date.temp,
          wind:defaultStyle.date.wind,
          forecast:defaultStyle.date.forecast,
        }
        this.setState({on:false})
        this.setState({left:0})
          AsyncStorage.setItem('StyleApp',JSON.stringify(newDate));
          defaultStyle.setDate(newDate),
          backButton();
      }
    }
    setTemp = () =>{
      if(!this.state.on){
        const newDate = {
          backgroundOn:defaultStyle.date.backgroundOn,
          backgroundAnimatedOn:defaultStyle.date.backgroundAnimatedOn,
          temp:'F',
          wind:defaultStyle.date.wind,
          forecast:defaultStyle.date.forecast,
        }
        this.setState({on:true})
        this.setState({left:32})
          AsyncStorage.setItem('StyleApp',JSON.stringify(newDate));
          defaultStyle.setDate(newDate);
          playButton();
      }
      else{
        const date ={
          backgroundOn:defaultStyle.date.backgroundOn,
          backgroundAnimatedOn:defaultStyle.date.backgroundAnimatedOn,
          temp:'C',
          wind:defaultStyle.date.wind,
          forecast:defaultStyle.date.forecast,
        }
        this.setState({on:false})
        this.setState({left:0})
          AsyncStorage.setItem('StyleApp',JSON.stringify(date));
          defaultStyle.setDate(date);
          backButton();
      }
    }
    setWind = () =>{
      if(!this.state.on){
        const newDate = {
          backgroundOn:defaultStyle.date.backgroundOn,
          backgroundAnimatedOn:defaultStyle.date.backgroundAnimatedOn,
          temp:defaultStyle.date.temp,
          wind:'kts',
          forecast:defaultStyle.date.forecast,
        }
        this.setState({on:true})
        this.setState({left:32})
          AsyncStorage.setItem('StyleApp',JSON.stringify(newDate));
          defaultStyle.setDate(newDate);
          playButton();
      }
      else{
        const date ={
          backgroundOn:defaultStyle.date.backgroundOn,
          backgroundAnimatedOn:defaultStyle.date.backgroundAnimatedOn,
          temp:defaultStyle.date.temp,
          wind:'km/h',
          forecast:defaultStyle.date.forecast,
        }
        this.setState({on:false})
        this.setState({left:0})
          AsyncStorage.setItem('StyleApp',JSON.stringify(date));
          defaultStyle.setDate(date);
          backButton();
      }
    }
    setForecast = ()=>{
      if(!this.state.on){
        const newDate = {
          backgroundOn:defaultStyle.date.backgroundOn,
          backgroundAnimatedOn:defaultStyle.date.backgroundAnimatedOn,
          temp:defaultStyle.date.temp,
          wind:defaultStyle.date.wind,
          forecast:6,
        }
        this.setState({on:true})
        this.setState({left:32})
          AsyncStorage.setItem('StyleApp',JSON.stringify(newDate));
          defaultStyle.setDate(newDate);
          playButton();
      }
      else{
        const date ={
          backgroundOn:defaultStyle.date.backgroundOn,
          backgroundAnimatedOn:defaultStyle.date.backgroundAnimatedOn,
          temp:defaultStyle.date.temp,
          wind:defaultStyle.date.wind,
          forecast:3,
        }
        this.setState({on:false})
        this.setState({left:0})
          AsyncStorage.setItem('StyleApp',JSON.stringify(date));
          defaultStyle.setDate(date);
          backButton();
      }
    }
     onPress = () =>{
       const choice = this.switchActions();
       switch (choice) {
        case 1:
          this.setMode();
          this.props.update();
          break;
        case 2:
          this.setBackground();
          break;
        case 3:
          this.setBackgroundAnimated();
          break;
        case 4:
          this.setTemp();
          break; 
        case 5: 
          this.setWind();
          break;
        case 6:
          this.setForecast();
          break;  
         default:
           break;
       }
    }
    render(){
      return(
         <TouchableOpacity activeOpacity={0.5} onPress={this.onPress} >
          <View style={style.container}> 
            <Text style={[style.StyleText,{color:`${this.props.colortext}`}]}>{this.props.buttonFunction}</Text>
             <View style={[style.styleToggle,{backgroundColor:!this.state.on ? 'grey' : defaultColor.headerColor}]} >
                <View style={[style.styleButton,{left:this.state.left}]}></View>
             </View>   
           </View>  
        </TouchableOpacity>
      );
    }
  }

const style = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      margin:24,
    },
    styleToggle:{
        height: 30,
        width: 60,
        position: 'relative',
        borderRadius : 21,
        marginLeft:'80%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
      },
      styleButton:{
         position:'absolute',
         height:28,
         width:28,
         backgroundColor:'white',
         borderRadius:30,
      },
      StyleText:{
        position:'absolute',
        start:Dimensions.get('screen').width>400 ? 18 : 0,
        fontSize:24,
        fontStyle:'italic',
        alignSelf:'flex-start',
      }
});