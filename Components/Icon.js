import React from 'react';
import {StyleSheet, Image} from 'react-native';

const Icon = (props) =>{
    return <Image source={{uri:props.url}} style={Style.ImageStyle} />
}

const Style = StyleSheet.create({
    ImageStyle:{
        width:70,
        height:70,
    }
});

export default Icon;