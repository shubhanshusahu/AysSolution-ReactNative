import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { lightTheme } from '../../data'

const Button = ({text = "press me",color =lightTheme.success ,action = ()=>{},
disabled = false,
txtcolor = lightTheme.primary,mwidth= 250,...props}) => {
  return (
   <TouchableOpacity style={{...styles.button, ...{backgroundColor : color, width :mwidth}}}
   onPress={()=>action()}
   disabled = {disabled}
   >
    {props.children}
    <Text style={{...styles.text, paddingLeft: 10, ...{color: txtcolor}}}>{text}</Text>
   </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignSelf:'center',
            alignItems:'center',

            margin:3,
            // height:40,
            padding: 10,
            paddingHorizontal:20,
            backgroundColor: lightTheme.button,
            borderRadius:20,
    },
    text:{
      textAlign:'center',
      padding : 10
        // fontSize:18,
        // color:lightTheme.primary
    },
})