import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { lightTheme } from '../../data'
import { useNavigation } from '@react-navigation/native'
import {  Text } from "react-native-animatable";
export default function NumberCard(props) {
  const navigation = useNavigation()
  const navv = (q) => {
    if(props.num == 0 || props.num == '0'){
      alert('No records found!')
      return
    }
    if(props?.access ==='agentRefferal')
    {
      navigation.navigate('referrals', { quer: `Referedby ='${q}'` ,access : 'agentreferrals'})
    }
    else{
      navigation.navigate('leadview', { quer: q ,access : props.access || 'admin'})
    }
  }

  return (
    <TouchableOpacity style={styles.main} onPress={() => navv(props.query)}>

      <Text  style={styles.header}>{props.title}</Text>
      <Text animation="flipInX" duration={1200} style={styles.num}>{props.num}</Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
    margin: 10,
    // marginTop: 0,
    backgroundColor: lightTheme.primary,
    textAlign: 'center',
    padding: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  header: {
    // fontSize : 18,
    width: '100%',
    textAlign: 'center',
    // backgroundColor :'blue',
    fontWeight: 'bold'
  },
  num: {
    fontSize: 50,
    fontWeight: '200'
  }
})