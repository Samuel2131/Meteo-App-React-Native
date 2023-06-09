
import React  from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, StyleSheet, View, FlatList,BackHandler} from 'react-native';
import { backButton, playButton } from '../Utils/Sound';
import axios from 'axios';
import ButtonAdd from '../Components/ButtonAdd';
import AddCityModal from '../Components/addCityModal';
import CardApp from '../Components/Card';
import { Theme } from '../Utils/Colors';
import { DarkTheme, DefaultTheme} from '@react-navigation/native';
import { savedCities } from '../Utils/UtilsObject';

const APIKEY = '49a7c8380f7a6ecff79d641e50ea7f48';

export default class Home extends React.Component {
  componentDidMount(){
    for(var i=0;i<savedCities.city.arrayCity.length;i++){
      this.state.city.push(this.props.route.params[i]);
    }
    this.setState({city:this.state.city});
    BackHandler.addEventListener('hardwareBackPress',()=>true);
  }
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress',()=>true);
  }
  state = {
    textValue:'',
    city:[],
    stateModal:false,
    language:'it',
    controlCity:false,
  }
  pressCard = (index,image) =>{
    playButton();
    this.state.city.forEach((item) =>{
        item.city.sunrise = image;
        if(item.city.id == index)this.props.navigation.navigate('City',item,this.props.navigation);
    });
  }
  addCity = () =>{
    this.setState({controlCity:false});
    if(this.state.textValue.trim() !== ''){
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.textValue}&APPID=${APIKEY}&lang=${this.state.language}`).then(data =>{
      if(data.status!=='404'){
      this.state.city.forEach((value)=>{
         if(data.data.city.name === value.city.name){
           Alert.alert('ERRORE','Città già selezionata');
           this.setState({controlCity:true});
         }
      });
      if(!this.state.controlCity){
      this.state.city.push(data.data);
      this.setState({city:this.state.city});
      }
      if(!this.state.controlCity){
        this.setState({
          stateModal:false,
          textValue:'',
        });
    }
    else this.setState({textValue:''});
    }
    }).catch((error) =>{
      Alert.alert('Attenzione!',error);
      console.log(error);
    });
  }
  else Alert.alert('Scrivi qualcosa!');
  }
  deleteCity = (nameCity) =>{
    backButton();
    const newArray = this.state.city.filter(value=> value.city.name!==nameCity);
    savedCities.removeCity(nameCity);
    AsyncStorage.setItem('savedCities',JSON.stringify(savedCities.city.arrayCity));
    this.setState({city:newArray})
  }
  addModal = () =>{
   this.setState({stateModal:true});
  }
  deleteModal = () =>{
    this.setState({stateModal:false});
    backButton();
  }
  onChangeText = (newText) =>{
      this.setState({textValue:newText});
  }
  refresh = () =>{
    //this.setState({city:[]});
    this.forceUpdate();
  }
  render(){
    return(
    <View style={[styles.container,{backgroundColor:Theme.theme.dark ? DarkTheme.colors.background : DefaultTheme.colors.background}]} >
      <AddCityModal visible={this.state.stateModal} textValue={this.state.textValue} myChangeText={this.onChangeText} notVisible={this.deleteModal} addCity={this.addCity} addModal={this.addModal}/>
      <View style={styles.styleScrollView} >
      <ButtonAdd 
        title='+'
        addModal={this.addModal} 
        deleteModal={this.deleteModal} 
        addCity={this.addCity} 
        prova={false} 
        metodo={0}
        myMargin={18}
        rotate={{rotate:'0deg'}}
        width={60}
        height={60}
      />
      </View>
      <FlatList 
       data={this.state.city}
       renderItem={({item}) => <CardApp title={item.city.name} object={item} methodAdd={this.pressCard} methodDelete={this.deleteCity} indice={item.city.id.toString()} />}
       keyExtractor={(item) => item.city.id.toString()}
       //refreshControl={<Refresh stateRefresh={this.refresh} mode={this.state.Theme.dark} />}
     />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
   flex:1,
  },
  styleScrollView:{
    alignItems:'center',
    justifyContent:'center',
  },
});