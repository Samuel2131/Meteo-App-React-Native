import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions} from 'react-native';
import { controlBackground, conversionC_F, defaultStyle, savedCities } from '../Utils/UtilsObject';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { playButton, backButton } from '../Utils/Sound';
import GestureRecognizer from 'react-native-swipe-gestures';

const iconHeart = <Ionicons name="heart" size={18} color="red" />;

const defaultImg = () => {return 'https://www.sys-point.com/wp-content/uploads/2019/05/sfondo-blu.jpg'}

const imgTempAnimated = (description,ora) =>{
  if(description.includes('SERENO')){
    if(ora<18 && ora>=6)return 'https://gifimage.net/wp-content/uploads/2017/08/sole-gif-18.gif';
    else return 'https://i.pinimg.com/originals/c5/04/4a/c5044af8dc9495d40dad54c60d7a00c0.gif';
  }
  else if(description.includes('NUVOLE')){
    if(ora<18 && ora>=6)return 'https://valueadders.com.au/wp-content/uploads/2020/05/TheCloud.gif';
    else return 'https://66.media.tumblr.com/e46e5775f6b3cf209fd6fe769dae5933/tumblr_olj2c8FdfP1vosa0to1_500.gif';
  } 
  else if(description.includes('PIOGGIA')) {
    if(ora<18 && ora>=6)return 'https://i.pinimg.com/originals/28/5a/a9/285aa9aa8c95dfb46d9acb3420b82e00.gif';
    else return 'https://i.pinimg.com/originals/8f/66/eb/8f66eb214c5f37e64a5fbf45f0ea68ec.gif';
  }
  else if(description.includes('NUBI') || description.includes('COPERTO')) return 'https://78.media.tumblr.com/10cce6d8b6a31e033ea25b156226c99c/tumblr_npws8frme51taknieo1_500.gif';
  else if(description.includes('NEVE') || description.includes('NEVICATE') || description.includes('NEVICATA')) return 'http://3.bp.blogspot.com/-5GXJTTX571A/UqHFTplzgoI/AAAAAAAAUyM/z_PRPQwBlIw/s1600/5339057151_d55540fdd2_b-SNOW.gif';
  else if(description.includes('NEBBIA') || description.includes('FOSCHIA')) return 'https://www.bing.com/images/search?view=detailV2&ccid=nBnJwLDN&id=946BE029568076B1CF7B7A4680E9E382695DC9B1&thid=OIP.nBnJwLDNbkr_ZNYTfWBxWAHaDn&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.9c19c9c0b0cd6e4aff64d6137d607158%3frik%3dscldaYLj6YBGeg%26riu%3dhttp%253a%252f%252fwww.maddaluno.eu%252fwp-content%252fuploads%252f2017%252f05%252fgiphy.gif%26ehk%3dSRpnpXANsWC4UWsTGc3yffooG%252btb2C9EU7wmBdLyuk4%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=244&expw=500&q=nebbia.gif&simid=608051903372080176&FORM=IRPRST&ck=CFBFA72700DD5052C4CB9CC285B97F86&selectedIndex=0&ajaxhist=0&ajaxserp=0';

  return 'error';
}

const imgTemp = (description,ora) =>{
  if(description.includes('SERENO')){
    if(ora<18 && ora>=6)return 'https://live.staticflickr.com/5291/5566458038_09902278e1_b.jpg';
    else return 'https://wallpapercave.com/wp/FjnZ25X.jpg';
  }
  else if(description.includes('NUVOLE')){
    if(ora<18 && ora>=6)return 'https://thumbs.dreamstime.com/b/cielo-nuvoloso-23853788.jpg';
    else return 'http://2.bp.blogspot.com/-gOGFqgHbKxo/UIr6-WBsSPI/AAAAAAAAAiI/a3bxYyRDQjE/s1600/le-foto-della-notte-e-della-pioggia-nb15178.jpg';
  } 
  else if(description.includes('PIOGGIA')) {
    if(ora<18 && ora>=6)return 'https://www.bignotizie.it/wp-content/uploads/2019/11/Pioggia-e-vento.jpg';
    else return 'https://2.bp.blogspot.com/-gOGFqgHbKxo/UIr6-WBsSPI/AAAAAAAAAiI/a3bxYyRDQjE/s1600/le-foto-della-notte-e-della-pioggia-nb15178.jpg';
  }
  else if(description.includes('NUBI') || description.includes('COPERTO')) return 'https://www.tp24.it/immagini_articoli/01-02-2018/1517469810-0-meteo-cielo-coperto-trapani-provincia-arriva-anche-pioggia.jpg';
  else if(description.includes('NEVE') || description.includes('NEVICATE') || description.includes('NEVICATA')) return 'https://image.ibb.co/cOieXn/32_AA59_DB_1015_4_B0_A_BAD3_C4_FDC810784_D.jpg';
  else if(description.includes('NEBBIA') || description.includes('FOSCHIA')) return 'https://img.fotocommunity.com/nebbia-sulla-campagna-971ae859-dad8-43fc-b342-4d9a2b9bf029.jpg?height=1080';

  return 'error';
}
const saveCity = (name) =>{
   playButton();
   savedCities.setCity(name);
   AsyncStorage.setItem('savedCities',JSON.stringify(savedCities.city.arrayCity));
}
const removeCity = (name)=>{
  backButton();
  savedCities.removeCity(name);
  AsyncStorage.setItem('savedCities',JSON.stringify(savedCities.city.arrayCity));
}
const CardApp = (props) =>{
 const deleteButton = (progress,dragX) =>{
    const scale = dragX.interpolate({
      inputRange:[0,150],
      outputRange:[1,2],
      extrapolate:'clamp'
    });
    return (
    <TouchableOpacity activeOpacity={0.6} onPress={()=> props.methodDelete(nameCity)}> 
     <View style={[styles.styleDeleteButton,{backgroundColor:'red'}]}>
     <Animated.View style={{transform:[{scale:scale}],alignItems:'center'}}>  
       <Ionicons name="trash-bin-outline" size={24} color="white" />
       <Text style={{fontStyle:'italic',fontSize:10,color:'white'}}>Elimina</Text>
       </Animated.View>
     </View> 
    </TouchableOpacity>
    );
  }  
  const favouriteButton = (progress,dragX) =>{
    const control = savedCities.searchCity(nameCity);
    const scale = dragX.interpolate({
      inputRange:[-100,0],
      outputRange:[1.5,0.5],
      extrapolate:'clamp'
    });
    return (
    <TouchableOpacity activeOpacity={0.6} onPress={control ? ()=> removeCity(nameCity) : ()=>saveCity(nameCity)}> 
     <View style={[styles.styleDeleteButton,{backgroundColor:'orange'}]}>
     <Animated.View style={{transform:[{scale:scale}],alignItems:'center'}}>
       {control ?
       <Ionicons name="heart" size={24} color="white" />
       :
       <Ionicons name="ios-heart-outline" size={24} color="white" />
       } 
       {control ? 
       <Text style={{fontStyle:'italic',fontSize:10,color:'white'}}>Rimuovi</Text>
       :
       <Text style={{fontStyle:'italic',fontSize:10,color:'white'}}>Preferiti</Text>
       } 
      </Animated.View>
     </View> 
    </TouchableOpacity>
    );
  }
   const nameCity = props.object.city.name;
   const arrayName = nameCity.split(' ');
   const tempCity = Math.floor(props.object.list[0].main.temp-273.15);
   var ora = props.object.list[0].dt_txt;
   ora = ora.substr(11,5);
   var imageProva = defaultImg();
   if(controlBackground()!=='https://www.sys-point.com/wp-content/uploads/2019/05/sfondo-blu.jpg')imageProva = defaultStyle.date.backgroundAnimatedOn ? imgTempAnimated(props.object.list[0].weather[0].description.toUpperCase(),ora.substr(0,2)) : imgTemp(props.object.list[0].weather[0].description.toUpperCase(),ora.substr(0,2));
  return( 
   <GestureRecognizer>
      <Swipeable renderLeftActions={deleteButton} renderRightActions={favouriteButton}>
       <View key={props.indice} style={styles.container}> 
       <TouchableOpacity activeOpacity={0.7} onPress={() => props.methodAdd(props.indice,imageProva)} >
      <View style={styles.styleButton}>  
        <ImageBackground source={{uri:imageProva}} style={styles.styleImage} >
      <View style={styles.styleOra}>
         <Text style={{fontSize:18,color:'white',textShadowColor:'grey',textShadowRadius:1,textShadowOffset:{width:1,height:2}}}>{ora}</Text>
      </View>
      <View style={styles.styleCity}>
         <Text style={{fontSize:arrayName.length>2 ? 25 : 35,fontStyle:'italic',color:'white',textShadowColor:'grey',textShadowRadius:1,textShadowOffset:{width:1,height:2}}}>{nameCity}</Text>
      </View>
      <View style={styles.styleTemp}>
        <Text style={{fontSize:56,textShadowColor:'grey',textShadowRadius:1,textShadowOffset:{width:1,height:2},color:'white'}}>{defaultStyle.date.temp==='C' ? tempCity.toFixed(0) : conversionC_F(tempCity).toFixed(0)}°</Text>
      </View>
      </ImageBackground>
      </View>
      {savedCities.searchCity(nameCity) ?
       <View style={styles.styleIcon}>
        {iconHeart}
       </View>
       :
       <View></View>
      }
      </TouchableOpacity>
      </View>
     </Swipeable>
    </GestureRecognizer>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
      },
      styleImage:{
        width:'100%',
        height:'100%',
      },
    styleButton:{
        backgroundColor:'white',
        flexDirection:'row',
        marginTop:25,
        height:105,
        width:'100%',
        shadowColor:'black',
        shadowRadius:3,
        shadowOpacity:0.5,
        shadowOffset:{width:0,height:2},
    },
    styleCity:{
         position:'absolute',
         alignItems:'flex-end',
         justifyContent:'flex-end',
         padding:18,
         marginStart:12,
         marginTop:18
    },
    styleTemp:{
      position:'absolute',
      end:10,
      padding:18
    },
    styleOra:{
      position:'absolute',
      marginStart:32,
      marginTop:18
    },
    styleIcon:{
      position:'absolute',
      top:32,
      right:8,
      width:18,
      height:18,
    },
    styleDeleteButton:{
      height:105,
      width:75,
      marginTop:25,
      justifyContent:'center',
      alignItems:'center'
    },
    styleVideo:{
      width:Dimensions.get('screen').width,
      height:'100%'
    }
})

export default CardApp;    