import React from 'react'

import {  Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const Card = (props) => {

const dispatch =useDispatch();
const Leadof = useSelector(state => state.reducer)
const navigation = useNavigation();
const LeadGen = async(data)=>{
  console.warn('lllllllead',data)
  navigation.navigate('Lead', {userroute : 'Logged in',dataroute : data})
}

  return (
   <TouchableOpacity style ={styles.curve} key={props.id} onPress={()=> LeadGen(props)} >
      <Image 
        style={styles.img}
        source={{
          uri:props.img,
        }}
      />
    <Text style ={styles.title}>{props.title}</Text>
   </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
    curve: {
      display: "flex",
      border: "0px solid black",
      // paddingTop: "10px",
      // paddingBottom:"15px",
      width: "46%",
      borderRadius: 16,
      flexDirection: "column",
      alignItems: "center",
      margin:7,
      height: 145,
      backgroundColor: '#12124a',
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 12,
      textAlign:'center',
      // justifyContent:'center'
    },
    img:{
      width: "95%",
      borderRadius:13,
      height : "100%",
      maxHeight:110,
      marginTop: 4,
      // WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    title: {
      // position: 'absolute', top: 84, left: "17%", right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
      color: '#dadada',

      fontSize: 15,

    },
    subtitle: {
      fontSize: 36,
      color: "#38434D",
    },
  });
  