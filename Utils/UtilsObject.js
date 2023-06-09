import React  from "react"
import { Ionicons } from '@expo/vector-icons';

const defaultStyle = {
   date:{ 
    backgroundOn:false,
    backgroundAnimatedOn:true,
    temp:'C',
    wind:'km/h',
    forecast:3,
   },
   setDate : (newDate) =>{defaultStyle.date=newDate}
}

const controlBackground = () => {
   if((!defaultStyle.date.backgroundAnimatedOn && !defaultStyle.date.backgroundOn))return 'https://www.sys-point.com/wp-content/uploads/2019/05/sfondo-blu.jpg';
}

const conversionC_F = (tempC) =>{return ((tempC*(9/5))+32)}

const conversioneKm_kts = (speed) =>{return (speed/1.852)}

const stateUrl = {
    iconHeart:<Ionicons name="ios-heart-outline" size={24} color="black" />,
    setUrl: (newUrl) => {stateUrl.urlHeart=newUrl},
}

const savedCities = {
   city:{
      arrayCity:[],
   },
   setArray : (newArray) =>{savedCities.city.arrayCity = newArray},
   setCity : (newCity) =>{savedCities.city.arrayCity.push(newCity)},
   removeCity : (oldCity) =>{
    savedCities.city.arrayCity = savedCities.city.arrayCity.filter(value=> value!==oldCity);
   },
   searchCity : (City)=>{
      const arrayName = City.split(' ');
      for(var i=0;i<savedCities.city.arrayCity.length;i++){
         const arrayNameLoop = savedCities.city.arrayCity[i].split(' ');
         if(arrayName.length===arrayNameLoop.length){
            if(savedCities.city.arrayCity[i]===City)return true;
         }else{
          for(var y=0;y<arrayName.length;y++){
             if(savedCities.city.arrayCity[i]===arrayName[y])return true;
          }
         }
      }
      return false;
   },
   clearArray : () =>{savedCities.city.arrayCity = []},
}

const check = {
   controlSound:false,
   setControlSound : (newValue) =>{check.controlSound=newValue},
}

const visitedCity = {
   city:[{name:'',counter:0}],
   setArray : (newArray) =>{visitedCity.city = newArray},
   setCity : (newCity) =>{visitedCity.city.push(newCity)},
   searchCity : (city) =>{
   var indice = -1;  
   visitedCity.city.forEach((value,index)=>{
      if(value.name===city)indice = index;
   });
   return indice;
   },
   setCounter : (index) =>{visitedCity.city[index].counter++},
   searchMaxCounter : () =>{
      var max = {};
      if(visitedCity.city.length===1)return visitedCity.city[0].name;
      else{
      for(var i=0;i<visitedCity.city.length-1;i++){
         if(i==0)max = visitedCity.city[i];
         if(max.counter<visitedCity.city[i+1].counter)max = visitedCity.city[i+1];
      }
      return max.name;
   }
   },
   clearArray : () =>{visitedCity.city = []},
}

const PollutionDate = {
 arrayPollution:[],
 setDate:(newDate)=>{PollutionDate.arrayPollution=newDate} 
}

export {defaultStyle, check, PollutionDate, stateUrl, savedCities, visitedCity, conversioneKm_kts, conversionC_F, controlBackground};