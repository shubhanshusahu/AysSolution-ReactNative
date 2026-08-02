import {  Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-animatable';
// import Clipboard from '@react-native-community/clipboard';
import { lightTheme } from '../data';
import Button from '../components/Elements/Button';
// import { Octicons } from '@expo/vector-icons';
import Octicons from 'react-native-vector-icons/Octicons';

import { useDispatch, useSelector, } from 'react-redux'

const Refer = (props) => {
  const {user} = useSelector(state => state.reducer)

  let msg = "Hi, there I want to share this amazing app where you can earn direct commission of Rs. 500 with just refering the person details who needs any policy/ Loan/ Property, Download this app using my Refer code: "+user.ReferCode+" to get Joining bonus of Rupees 50."

    const opensms = (num) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
          const url = `sms:${separator}body=${msg}`
        Linking.openURL(url)
      }
    
      const openWhatsapp = (num) => {
        let url = "whatsapp://send?text=" +msg 
          // "&phone=91" +
          // 9630546477;
        Linking.openURL(url)
      }

  return (
    <View>
      <View style={styles.nam}><Octicons name="cross-reference" size={30} color="black" /><Text style={{fontSize:24,fontWeight:'bold'}}>Refer to EARN!</Text></View>
      {props.ReferCode && <View style={{display:'flex'}}>
         <Text style={styles.textStyle}>Your Refer Code: {props.ReferCode}</Text>
         {/* <MaterialCommunityIcons onPress={()=> Clipboard.setString('props.ReferCode')} name="content-copy" size={24} color="black" /> */}
         </View>}
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf:'center'}}>
        <TouchableOpacity onPress={() => {
          let number = '';
          if (Platform.OS === 'ios') {
            number = 'telprompt';
          }
          else {
            number = 'tel:';
          }
          Linking.openURL(number);
        }}><Image
            animation="bounceInDown" Easing='easeIn' duration={1200}
            style={styles.img} source={require('../../assets/call.png')} onPress={() => alert('pressed')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => opensms(props.ReferCode)}>
          <Image
            animation="bounceInDown" Easing='easeIn' duration={1500}
            style={styles.img} source={require('../../assets/sms.png')} onPress={() => alert('pressed')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openWhatsapp(props.ReferCode)}>
          <Image
            animation="bounceInDown" Easing='easeIn' duration={1800}
            style={styles.img} source={require('../../assets/whatsapp.png')} onPress={() => alert('pressed')} />
        </TouchableOpacity>
      </View>
      <Button text="Close"  color={lightTheme.close} action={() => props.setModalVisible(false)} />
    </View>
  )
}

export default Refer

const styles = StyleSheet.create({  
    img: {
    width: 50,
    height: 50,
    margin: 10,
  },
  nam: {
    width:'auto',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    padding: 15,
    marginBottom:20,
    backgroundColor:lightTheme.lightGrey,
    borderRadius:15
  },
})