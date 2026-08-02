import { View, Text, Dimensions, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function ImgBackground(props) {
  return (
    <View style ={{maxHeight:'100%',width:'100%'}}>
    <ImageBackground
    source={{
      uri:props.imguri,
    }}
    resizeMode="cover"
    style={styles.img}>
       <View style={{width:"100%"}}>{props.children}</View> 
        </ImageBackground></View>
  )
}



const styles = StyleSheet.create({
  
    img: {
      height: "100%",
      width: screenWidth,
      justifyContent: 'center',
      // alignItems: 'flex-start',

        // flex: 1,
        // maxWidth: 960,
        marginHorizontal: "auto",
    },
})