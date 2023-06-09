
import React  from 'react';
import {StyleSheet,View,Text, Dimensions} from 'react-native';

const Element = (props) =>{
  return(
    <View style={style.styleElements}>
         <Text style={[props.styleText,{start:12},{fontSize:Dimensions.get('window').height>750 ? 18 : 14}]}>{props.acronym}</Text>
         <Text style={style.styleDescription} >{props.name}</Text>
         <Text style={[props.styleText,{fontSize:Dimensions.get('window').height>750 ? 18 : 14},{left:props.left},{position:'absolute'}]}>{props.value}</Text>
         <View style={props.styleSeparator} />
    </View>
  );
}
const style = StyleSheet.create({
    styleElements:{
        position:'relative',
        marginBottom:15,
        flexDirection:'row',
        alignItems:'center',
      },
      styleDescription:{
        position:'absolute',
        fontSize:Dimensions.get('window').height> 700 ? 14 : 12,
        start:75,
        color:'white',
        shadowOffset: {
         width: 0,
         height: 0,
       }
    }
});

export default Element;