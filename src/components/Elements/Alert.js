import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

    export const createThreeButtonAlert = (txt="Answer this..",yesfunc=()=>{},nofunc=()=>{}) =>{
    return ( Alert.alert('Confirmation!',txt, [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'No',
        onPress: () => nofunc(),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => yesfunc()},
    ]))
    }


