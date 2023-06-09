import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ImageBackground, View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import Day from '../Components/CityDay';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { backButton, playButton } from '../Utils/Sound';
import { conversionC_F, defaultStyle, stateUrl, savedCities, PollutionDate, visitedCity} from '../Utils/UtilsObject';

const iconHeart = <Ionicons name="heart" size={32} color="red" />;
const iconEmptyHeart = <Ionicons name="ios-heart-outline" size={32} color="black" />;
const urlImageBug = 'https://images.pexels.com/photos/239107/pexels-photo-239107.jpeg?cs=srgb&dl=astronomia-cielo-cielo-nocturno-cosmos-239107.jpg&fm=jpg';
var index = 0;
let lastTap = null;
const AirPollutionAPI = 'e8c1d7f8847ea87ef2ecaffc79727826';

const toUpperFirst = (str) => {
  var lett = str[0].toUpperCase();
  str = str.substr(1);
  str = lett + '' + str;
  return str;
}

const addKey = () => {return index++};

const separator = () =>{
  return(
    <View style={styles.styleSeparator} />
  )
  }

const newList = (list) =>{
  var newArray = [];
   for(var i=0;i<20;i++){
      newArray.push(list[i]);
   }
   return newArray;
}

export default class City extends React.Component{
  componentDidMount(){
    const index = visitedCity.searchCity(this.props.route.params.city.name);
    if(index===-1){
    visitedCity.setCity({
     name : this.props.route.params.city.name,
     counter : 0,
    });
    }
    else visitedCity.setCounter(index);
    AsyncStorage.setItem('visitedCity',JSON.stringify(visitedCity.city));
    if(savedCities.searchCity(this.props.route.params.city.name))this.setState({stateUrl:iconHeart});
    else this.setState({stateUrl:iconEmptyHeart});
    this.callAxios(this.props.route.params.city.coord.lat,this.props.route.params.city.coord.lon);
  }
  state = {
    stateUrl:stateUrl.iconHeart,
  }
  nameCity = ()=>{return this.props.route.params.city.name}

  callAxios = (lat,lon) =>{
    axios.get(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${AirPollutionAPI}`).then(data =>{
      var arrayPollution = [];
      for(var i=0;i<20;i++){
        const newDate = {
          aqi:data.data.list[i].main.aqi,
          components:data.data.list[i].components,
         }
       arrayPollution.push(newDate);
      }
      PollutionDate.setDate(arrayPollution);
    }).catch(error =>{
     console.log(error);
    });
 } 

  changeUrl =  () =>{
    if(this.state.stateUrl===iconEmptyHeart){
      this.setState({stateUrl:iconHeart});  
      stateUrl.setUrl(iconHeart);
      savedCities.setCity(this.nameCity());
      AsyncStorage.setItem('savedCities',JSON.stringify(savedCities.city.arrayCity));
      playButton();
    }
    else{
      this.setState({stateUrl:iconEmptyHeart});
      stateUrl.setUrl(iconEmptyHeart);
      savedCities.removeCity(this.nameCity());
      AsyncStorage.setItem('savedCities',JSON.stringify(savedCities.city.arrayCity));
      backButton();
    }
  }
  whiteHeart = () =>{
    if(this.state.stateUrl===iconHeart)return (<Ionicons name="heart" size={32} color="red" />);
    else return(<Ionicons name="ios-heart-outline" size={32} color="white" />);
  }
  doubleClick = () =>{
     const now = Date.now();
     const time_delay = 500;
     if((now - lastTap) < time_delay){
       this.changeUrl();
     }else{
       lastTap = now;
     }   
  } 

  functionCity = (props) =>{
  const imageProva =props.route.params.city.sunrise;
  const nameCity = props.route.params.city.name;
  const arrayName = nameCity.split(' ');
  var tempCity = Math.floor(props.route.params.list[0].main.temp-273.15);
  var description = toUpperFirst(props.route.params.list[0].weather[0].description);
  var ora = props.route.params.list[0].dt_txt;
  ora = ora.substr(11,5);
  props.route.params.list = newList(props.route.params.list);
  return(
     <View style={styles.container}>
      <ImageBackground source={{uri:imageProva}} style={styles.styleImage} />
      <TouchableOpacity activeOpacity={0.7} style={{width:'100%'}} onPress={this.doubleClick}>   
     <View style={styles.styleIntro}>
       <Text style={[{position:'absolute'},styles.textStyles,{fontSize:arrayName.length>2 ? 24 : 42}]}>{nameCity}</Text>
     <TouchableOpacity style={styles.styleIcon} onPress={this.doubleClick} activeOpacity={0.7}>
     {imageProva===urlImageBug ? this.whiteHeart() : this.state.stateUrl}
     </TouchableOpacity>
     </View>
       <View style={styles.styleBar}>
         <Text style={{fontSize:24,color:'white',textShadowColor:'black',textShadowRadius:1,textShadowOffset:{width:0,height:0}}}>{ora}</Text>
         <Text style={{fontSize:24,color:'white',textShadowColor:'black',textShadowRadius:1,textShadowOffset:{width:0,height:0}}}>{description}</Text>
         <Text style={{fontSize:24,color:'white',textShadowColor:'black',textShadowRadius:1,textShadowOffset:{width:0,height:0}}}>{defaultStyle.date.temp==='C' ? tempCity.toFixed(1) : conversionC_F(tempCity).toFixed(1)}°</Text>
      </View>  
      </TouchableOpacity>
      <FlatList 
       data={props.route.params.list}
       renderItem={({index}) => <Day date={props.route.params} indice={index} navigation={this.props.navigation} ImageBackground={imageProva} />} 
       ItemSeparatorComponent={separator}
       ListFooterComponent={separator}
       keyExtractor={(item) => (item.key = addKey()).toString()}
      />    
     </View>
  );
}
render(){
  return(this.functionCity(this.props));
}
}
const styles = StyleSheet.create({
   container:{
     flex:1,
   },
   styleImage:{
     position:'absolute',
     width:Dimensions.get('screen').width,
     height:Dimensions.get('screen').height,
   },
   styleIcon:{
     position:'relative',
     width:30,
     height:30,  
     marginLeft:'85%', 
   },
   styleIntro:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:5,
    marginTop:5
   },
   textStyles:{
     fontSize:42,
     color:'white',
     fontStyle:'italic',
     textShadowColor:'black',
     textShadowRadius:1,
     textShadowOffset:{width:0,height:0}
   },
   styleBar:{
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between',
     marginTop:5,
     marginBottom:10
   },
   styleSeparator:{
    height: 1,
    width: "95%",
    margin: 10,
    backgroundColor: "#fff",
    borderColor: "black",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 1,
    shadowRadius: 7.49
   },
   styleVideo:{
    position:'absolute',
    width:Dimensions.get('screen').width,
    height:Dimensions.get('screen').height,
   }
});