import { View as ViewAN, Text, Image } from "react-native-animatable";
import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// import { AntDesign,MaterialCommunityIcons ,Ionicons  } from '@expo/vector-icons'; 
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PostReq } from "../apiCalls/api";
import { useState } from "react";

const SignUp = (props) => {
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState({
        Name: '',
        Phone: '',
        Email: '',
        Password: '',
        Address: '',
        UPIid : '',
        Referedby : '',
        ReferCode :''
    })
    const Register=async ()=>{     
        setloading(true)
        if(data.Name != "" && data.Phone!==""  && data.Password != "")
            {
              data.ReferCode = data.Name.toLowerCase().slice(0,3)+data.Phone.slice(2,5);
              await PostReq('/agent',data,'Account created!')
                setloading(false)
                // props.setsignupVisible(false)
            }
        else
            alert('Please enter the details!')
    }

  return (<>
    <ScrollView style={{maxHeight:'90%',marginBottom:'5%'}} >
    <ViewAN style={styles.container2} animation="slideInUp" duration={800}>

            <Text style={styles.title2} animation="slideInUp" duration={600}>Sign up</Text>
                {/* <Text style={styles.subtitle} animation="slideInUp" /duration={1100}>Name </Text> */}
            <TextInput style={styles.textInput} placeholder="Name*"  
             defaultValue={data.Name}
                onChangeText ={(e)=>setdata({...data,'Name':e})}
            />
            <TextInput style={{...styles.textInput,...styles.referralcode}} placeholder="Referral code.."  
             defaultValue={data.Referedby}
                onChangeText ={(e)=>setdata({...data,'Referedby':e})}
            />
            {/* <Text style={styles.subtitle} animation="slideInUp" duration={1100}>Phone </Text> */}
            <TextInput style={styles.textInput} placeholder="Phone*"  keyboardType="numeric"
             defaultValue={data.Phone}
                onChangeText ={(e)=>setdata({...data,'Phone':e})}
            />
            {/* <Text style={styles.subtitle} animation="slideInUp" duration={1100}>Email </Text> */}
            <TextInput style={styles.textInput} placeholder="Email*" 
             defaultValue={data.Email}
                onChangeText ={(e)=>setdata({...data,'Email':e})}
            />
            <TextInput style={styles.textInput} placeholder="Address" 
             defaultValue={data.Address}
                onChangeText ={(e)=>setdata({...data,'Address':e})}/>
            {/* <Text style={styles.subtitle} animation="slideInUp" duration={1100}>Password </Text> */}
            <TextInput style={styles.textInput} placeholder="Password*" secureTextEntry
             defaultValue={data.Password}
                onChangeText ={(e)=>setdata({...data,'Password':e})}
            />
            <TextInput style={styles.textInput} placeholder="Re-enter Password" secureTextEntry
            //  defaultValue={data.Password}
            //     onChangeText ={(e)=>setdata({...data,'Password':e})}
            />
            {/* <Text style={styles.subtitle} animation="slideInUp" duration={1100}>UPI ID </Text> */}
            {/* <TextInput style={styles.textInput} placeholder="UPI ID" 
             defaultValue={data.UPIid}
                onChangeText ={(e)=>setdata({...data,'UPIid':e})}
            /> */}
            <TouchableOpacity style={styles.button} onPress={() =>
             Register()
            }>  
            <Text style ={styles.buttonText}>
            Register</Text>
            { !loading? 
                  <MaterialCommunityIcons name="account-plus-outline" size={24} color="#fff" />
                  :
                  <ActivityIndicator size={30} color="#fff" />
                  }
           
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() =>
             props.setsignupVisible(false)
            }><Text style ={styles.buttonText}>Already have an account</Text>
           <Ionicons name="arrow-back-circle-outline" size={27} color="#fff" />
            </TouchableOpacity>
            </ViewAN>
          </ScrollView>


          
          </>
  )
}

export default SignUp


const styles = StyleSheet.create({
    buttonText: {
        marginLeft: 15,
        color:'#fff',
        paddingVertical:10
      },
    container2: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: "rgba(9, 9, 9, 0.2)",
        borderRadius: 20,
        padding: 30,
        paddingTop: 100
      }
      ,
      textInput: {
        fontSize: 18,
        marginVertical:8,
        // border: ["aliceblue", "0px solid black"],
        borderBottomWidth: 1,
      },
      referralcode:{
        borderColor:'lightgreen',
      },
      main: {
        flex: 1,
        maxWidth: 960,
        marginHorizontal: "auto",
      },
      title: {
        alignSelf: 'center',
        paddingBottom: 30,
        fontSize: 64,
        fontWeight: "bold",
      },
      title2: {
        fontSize: 30,
        fontWeight: "bold",
      },
      subtitle: {
        fontSize: 20,
        color: "#000",
      },
      Link: {
        fontSize: 25,
        color: "#fff",
        padding: 10,
        // backgroundColor:'red',
        textAlign: 'center',
        width: '100%'
      },
      button: {
        display:'flex',
        flexDirection:'row-reverse',
        // width:200,
        backgroundColor:'grey',
        justifyContent:'flex-end',
        paddingRight:15,
        paddingLeft: 10,
        marginTop: 10,
        borderRadius: 16,
        backgroundColor: "#000",
        alignItems: "center"
      }

})