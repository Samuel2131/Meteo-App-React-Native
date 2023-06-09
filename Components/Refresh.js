import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import {RefreshControl} from 'react-native';
import { defaultColor, Theme } from '../Utils/Colors';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve,timeout))
}

const Refresh = (props) =>{
    const color = props.mode ? DarkTheme.colors.text : DefaultTheme.colors.text;
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() =>{
        setRefreshing(false) 
        props.stateRefresh();
    });
    });
    return (<RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={[{tintColor:color},{color:color}]} />)
}

export default Refresh;