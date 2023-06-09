
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultTheme } from '@react-navigation/native';
import React from 'react';
import axios from 'axios';
import { View ,StyleSheet} from 'react-native';
import { Theme } from '../Utils/Colors';
import { defaultStyle,savedCities, visitedCity } from '../Utils/UtilsObject';
import AnimatedLottieView from 'lottie-react-native';

const APIKEY = '49a7c8380f7a6ecff79d641e50ea7f48';
const language = 'it';

export default class Loading extends React.Component{
    componentDidMount(){ 
        AsyncStorage.getItem('StyleApp').then((date)=>{
            if(date===null) AsyncStorage.setItem('StyleApp',JSON.stringify(defaultStyle.date));    
            else defaultStyle.setDate(JSON.parse(date));
            });
        AsyncStorage.getItem('visitedCity').then((date)=>{
            if(date===null) AsyncStorage.setItem('visitedCity',JSON.stringify(visitedCity.city));
            else visitedCity.setArray(JSON.parse(date));
        })    
        AsyncStorage.getItem('savedCities').then((date)=>{
            if(date===null) AsyncStorage.setItem('savedCities',JSON.stringify(savedCities.city.arrayCity));
            else savedCities.setArray(JSON.parse(date));
        });    
        AsyncStorage.getItem('Theme').then((theme)=>{
            if(theme===null){
                AsyncStorage.setItem('Theme',JSON.stringify(DefaultTheme));
                Theme.setTheme(DefaultTheme);
                this.call();
            } 
            else{
                Theme.setTheme(JSON.parse(theme));
                this.call();
            } 
        });
    }
    call = ()  =>{
        let listCity = [];
        if(savedCities.city.arrayCity.length===0)this.props.navigation.navigate('StackHome');
        for(var i=0;i<savedCities.city.arrayCity.length;i++){
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${savedCities.city.arrayCity[i]}&APPID=${APIKEY}&lang=${language}`).then((data)=>{
             listCity.push(data.data);
             if(listCity.length===savedCities.city.arrayCity.length) this.props.navigation.navigate('StackHome',listCity);
            });
        }
    }
   render(){ 
    return(
      <View style={style.container}>
          <AnimatedLottieView
            source={require('../Animation/loader2.json')}
            loop={true}
            autoPlay={true}
            style={style.loaderStyle}
            speed={1}
          />
      </View>
    );
    } 
}

const style = StyleSheet.create({
   container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
   textStyle:{
    fontSize:28,
    fontStyle:'italic',
   },
   loaderStyle:{
       width:250,
       height:250,
   }
});