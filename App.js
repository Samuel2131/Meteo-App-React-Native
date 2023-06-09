import React, { useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './Screens/Home';
import { useTheme } from '@react-navigation/native';
import City from './Screens/City';
import Loading from './Screens/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SingleDay from './Components/SingleDay';
import Profile from './Screens/Profile';
import Options from './Screens/Options';
import { check } from './Utils/UtilsObject';
import { defaultColor } from './Utils/Colors';
import {Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { playButton } from './Utils/Sound';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = (props) =>{
  const theme = useTheme();
  const [mode,setMode] = useState(0)
  AsyncStorage.getItem('StyleApp').then((date)=>{
    const Date = JSON.parse(date)
    setMode(Date.mode);
  });
  return(
    <Tab.Navigator screenOptions={({route})=> ({
      tabBarIcon:({focused, color, size}) =>{
        if(route.name === 'Home'){
          size = focused ? 34 : 28;
          if(focused && check.controlSound) playButton();
          return (<Ionicons name='home' size={size} color={color} />);
        }
        else if(route.name === 'Profile'){
          size = focused ? 34 : 28;
          return (<MaterialIcons name="account-circle" size={size} color={color} />);
        }
        else if(route.name === 'Options'){
          size = focused ? 34 : 28;
          return (<Ionicons name="options" size={size} color={color} />);
        }
      },
      tabBarActiveTintColor:!theme.dark ? DarkTheme.colors.background : DefaultTheme.colors.background,
      tabBarInactiveTintColor:!theme.dark ? DarkTheme.colors.text : DefaultTheme.colors.text,
      tabBarStyle:{backgroundColor:defaultColor.headerColor},
      tabBarInactiveBackgroundColor:defaultColor.headerColor,
      tabBarActiveBackgroundColor:defaultColor.headerColor,
    })}>
      <Tab.Screen options={{header:() =>null}} name='Home'  component={Home} initialParams={props.route.params} />
      <Tab.Screen options={{header:() =>null}} name='Profile' component={Profile} initialParams={props.route.params} />
      <Tab.Screen options={{header:() =>null}} name='Options' component={Options} initialParams={props.route.params} />
    </Tab.Navigator>
  );
}
const App = () =>{
  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName = {'Loading'}>
        <Stack.Screen options={()=> ({gestureEnabled:false, title:'Meteo App',headerStyle:{backgroundColor:defaultColor.headerColor},headerTintColor:'white',headerBackVisible:false})} name='StackHome' component={TabNavigator}  />
        <Stack.Screen options={({route}) => ({title: route.params.city.name, headerStyle:{backgroundColor:defaultColor.headerColor},headerTintColor:'white'})} name='City' component={City} />
        <Stack.Screen options={({route}) =>({title : route.params.name, headerStyle:{backgroundColor:defaultColor.headerColor},headerTintColor:'white'})} name='SingleDay' component={SingleDay} />
        <Stack.Screen options={()=> ({title:'Loading',headerStyle:{backgroundColor:defaultColor.headerColor},headerTintColor:'white'})} name='Loading' component={Loading}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;