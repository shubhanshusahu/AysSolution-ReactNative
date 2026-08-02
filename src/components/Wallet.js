import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { lightTheme } from '../data'
import Entypo from 'react-native-vector-icons/Entypo';

import Button from './Elements/Button';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PutReq } from '../apiCalls/api';


const Wallet = () => {

  const [showInpt, setshowInpt] = useState(false)
  const [UPIid, setUPIid] = useState()
  const {user} = useSelector(state => state.reducer)
  const toggle =()=>{
    setUPIid(user.UPIid)
    setshowInpt(!showInpt)
    console.warn(user)
    // alert(showInpt)
  }
  const updateUpi= ()=>{
    PutReq(`/upiid?UPIid=${UPIid}&phone=${user.Phone}`,{},"UPI ID updated!")
  }
  return (
    <View style={styles.container}>
    < Entypo name="wallet" size={40} color="black" style={styles.icon}/> 
      <Text style={styles.text} >Wallet : ₹ 200</Text> 
      <Button text = "Request Withdrawal" action ={()=>toggle()} color ={lightTheme.success}  txtcolor = { lightTheme.primary } mwidth= {110}/>
      {showInpt? <>
        <TextInput defaultValue={UPIid} onChangeText={(e)=>setUPIid(e)} style={styles.inpt} placeholder='Your UPI ID here...' /> 
        <Button text = "Confirm" action ={()=>updateUpi()} color ={lightTheme.success}  txtcolor = { lightTheme.primary } mwidth= {110}/>
     </> : ''}
    </View>
  )
}

export default Wallet


const styles = StyleSheet.create({
    container:{
     width : '85%',
     borderRadius: 15,
    //  marginHorizontal:20,
     marginVertical : 10,
     backgroundColor: lightTheme.primary,
     textAlign: 'center',
     padding: 15,
     borderRadius: 30,
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 5,
     },
    //  overflow : '',
     flexWrap: 'wrap',
     shadowOpacity: 0.46,
     shadowRadius: 11.14,
     elevation: 17,
     display:'flex',
     flexDirection:'row',
     alignItems:'center',
     height:'auto',
     justifyContent:'space-between'
    }
    ,
    text:{
        fontSize:20,
        fontWeight:'300',
        width : 145,

        // paddingVertical : 20
    },
    inpt:{
      borderBottomColor :lightTheme.Secondary,
      paddingHorizontal:10
    }
    ,icon:{
        width:40,
  
    }
  })