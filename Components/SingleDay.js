import { DarkTheme } from '@react-navigation/native';
import React from 'react';
import {ImageBackground, View, StyleSheet, Text, Dimensions, FlatList} from 'react-native';
import { conversionC_F, conversioneKm_kts, defaultStyle, PollutionDate } from '../Utils/UtilsObject';
import Element from './Element';

var sizeText,myMargin,TopOpacity,heightOpacity,marginComponents,arrayElements = [];

  if(Dimensions.get('window').height > 850){
    sizeText = 20;
    myMargin = 21;
    TopOpacity = '49%';
    heightOpacity = '40%';
    marginComponents = 60;
  }
  else if(Dimensions.get('window').height<850 && Dimensions.get('window').height > 750){ 
     sizeText = 19;
     myMargin = 18;
     TopOpacity = '50%';
     heightOpacity = '42%';
     marginComponents = 53;
  }
  else if(Dimensions.get('window').height<750 && Dimensions.get('window').height>600){
     sizeText = 17;
     myMargin = 15;
     TopOpacity = '52%';
     heightOpacity = '40%';
     marginComponents = 49;
  }
  else if(Dimensions.get('window').height<600 && Dimensions.get('window').height>550){ 
    sizeText = 14;
    myMargin = 12;
    TopOpacity = '52%';
    heightOpacity = '40%';
    marginComponents = 42;
  }
  else if(Dimensions.get('window').height<550){
    sizeText = 12;
    myMargin = 10;
    TopOpacity = '50%';
    heightOpacity = '38%';
    marginComponents = 39;
  }
const allElements = (props) =>{
   arrayElements.push({acronym:'CO',name:'Monossido di Carbonio',value:PollutionDate.arrayPollution[props.route.params.indice].components.co,id:1})
   arrayElements.push({acronym:'O₃',name:'Ozono',value:PollutionDate.arrayPollution[props.route.params.indice].components.o3,id:2});
   arrayElements.push({acronym:'NO₂',name:'Biossido di Azoto',value:PollutionDate.arrayPollution[props.route.params.indice].components.no2,id:3})
   arrayElements.push({acronym:'SO₂',name:'Biossido di Zolfo',value:PollutionDate.arrayPollution[props.route.params.indice].components.so2,id:4})
   arrayElements.push({acronym:'PM10',name:'Polveri sottili',value:PollutionDate.arrayPollution[props.route.params.indice].components.pm10,id:5})
   arrayElements.push({acronym:'PM2.5',name:'Polveri sottili',value:PollutionDate.arrayPollution[props.route.params.indice].components.pm2_5,id:6})
}
const clearArray = () => arrayElements = [];

const SingleDay = (props) =>{
  clearArray();
  allElements(props);
  const image = props.route.params.imageBackground;
  var colorBackground;
  switch(PollutionDate.arrayPollution[props.route.params.indice].aqi){
    case 1:colorBackground = 'blue';
    break;
    case 2:colorBackground = 'green';
    break;
    case 3:colorBackground = 'yellow';
    break;
    case 4:colorBackground = 'orange';
    break;
    case 5:colorBackground = 'red';
    break;
 }
  return(
  <View style={style.container}>
    <ImageBackground source={{uri:image}} style={style.styleImage} /> 
    <View style={style.styleView}>
         <Text style={[style.styleText,{textTransform:'capitalize'}]}>Ore {props.route.params.hour} - {props.route.params.description}</Text>
         <View style={style.styleSeparator} />
         <Text style={[style.styleText,{marginTop:myMargin},{textTransform:'none'}]}>Visibilità : {'>'}{props.route.params.visibility/1000} km</Text>
         <Text style={[style.styleText,{marginTop:myMargin}]}>Umidità : {props.route.params.humidity}%</Text>
         <Text style={[style.styleText,{marginTop:myMargin}]}>Probabilità precipitazioni : {(props.route.params.pop*100)}%</Text>
         <Text style={[style.styleText,{marginTop:myMargin},{textTransform:'none'}]}>Pressione : {props.route.params.pressure/1000} bar</Text>
         <Text style={[style.styleText,{marginTop:myMargin}]}>Temperatura : {defaultStyle.date.temp==='C' ? props.route.params.temp.toFixed(1) : conversionC_F(props.route.params.temp).toFixed(1)}°{defaultStyle.date.temp}</Text>
         <Text style={[style.styleText,{marginTop:myMargin}]}>Nuvolosità : {props.route.params.cloud}%</Text>
         <Text style={[style.styleText,{marginTop:myMargin},{textTransform:'none'}]}>Velocità vento : {defaultStyle.date.wind==='km/h' ? (props.route.params.wind*3.6).toString().substr(0,5): conversioneKm_kts(props.route.params.wind*3.6).toString().substr(0,5)} {defaultStyle.date.wind}</Text>
    </View>
     <View style={style.styleOpacityView}>
       <Text style={style.styleText}>Qualità dell'aria</Text>
       <View style={[style.styleQuality,{backgroundColor:colorBackground}]}>
         <Text style={style.styleText}>{PollutionDate.arrayPollution[props.route.params.indice].aqi}</Text>
       </View>
       <FlatList
         data={arrayElements}
         renderItem={({item}) => <Element acronym={item.acronym} name={item.name} value={item.value}  left={'80%'} styleText={style.styleText} styleSeparator={style.styleSeparator} />}
         keyExtractor={(item) => item.id.toString()}
         style={style.styleComponents}
         />
    </View> 
    </View> 
 );
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    styleView:{
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        top:10,
        width:'95%'
    },
    styleOpacityView:{
       position:'absolute',
       top:TopOpacity,
       width:'95%',
       height:heightOpacity,
       alignItems:'center',
       backgroundColor:'rgba(52, 52, 52, 0.7)',
    },
    styleText:{
     fontSize:sizeText,
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
    },
    styleImage:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    styleSeparator:{
      position:'absolute',
      height: 1,
      width: "95%",
      margin:Dimensions.get('window').height>600 ? 10 : 5,
      top:Dimensions.get('window').height>600 ? 14 : 10,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      backgroundColor: "#fff",
      borderColor: "black",
      alignSelf: "center",
      shadowColor: "black",
      shadowOpacity: 1,
      shadowRadius: 7.49
     },
     styleQuality:{
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
        width:Dimensions.get('window').height > 750 ? 48 : 30,
        height:Dimensions.get('window').height > 750 ? 48 : 30,
        marginTop:Dimensions.get('window').height > 650 ? 28 : 18,
     },
     styleComponents:{
       position:'relative',
       width:'100%',
       marginTop:marginComponents,
     },
     styleElements:{
       position:'relative',
       width:'100%',
       flexDirection:'row'
     },
     styleDescription:{
       position:'absolute',
       fontSize:14,
       start:75,
       color:DarkTheme.colors.text,
       shadowOffset: {
        width: 0,
        height: 0,
      },
      textShadowColor:'black',
      top:5,
      shadowRadius:2,
      shadowOpacity:2,
      fontWeight:'500'
     },
     styleVideo:{
      position:'absolute',
      width:Dimensions.get('screen').width,
      height:Dimensions.get('screen').height,
     }
})
export default SingleDay;