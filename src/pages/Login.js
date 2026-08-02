
import { StyleSheet, TextInput, TouchableOpacity, View, Text as TextRN, ActivityIndicator } from "react-native";
// import { CheckBox } from "react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgBackground from '../components/ImgBackground'
// import { TouchableOpacity } from "react-native-gesture-handler";
import { View as ViewAN, Text, Image } from "react-native-animatable";
import AntDesign from 'react-native-vector-icons/AntDesign';

// import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from "react";
import store from '../components/redux/store'
import { Provider, useDispatch } from "react-redux";
import SignUp from "../components/SignUp";
import { useState } from "react";
import { GetReq, PostReq } from "../apiCalls/api";
import { Loandata } from "../data";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
  const [dataa, setdata] = useState({
    Phone: '',
    Password: '',
  })
  const [isSelected, setSelection] = useState(false);
  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(false)
  let d;
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const nav = async (data) => {
    dispatch({
      type: 'login',
      data: data[0]
    })
    await AsyncStorage.setItem('user', JSON.stringify(data[0]))
    setloading(false)
    if (data[0].Role === 'Admin')
      navigation.navigate('admindashboard', { name: 'Jane' })
    else
      navigation.navigate('Home', { name: 'Jane' })
  }
  const Login = async () => {

    try {
      setloading(!loading)
      let user = await PostReq('/login', dataa, '', nav)
      if (user?.data?.length == 0) {
        alert('Wrong Username or Password!')
        setloading(false)
        return
      }
      setuser(user)
    }
    catch (e) {
      console.warn(e)
    }
  }
  const [signupVisible, setsignupVisible] = useState(false)
  return (

    <View style={styles.container}>
      <View style={styles.main}>
        <ImgBackground imguri="https://e1.pxfuel.com/desktop-wallpaper/258/677/desktop-wallpaper-iphone7papers-blue-blur.jpg">
          <Image style={styles.img} animation="zoomInDown" Easing='easeIn' duration={1500} source={require('../../assets/BANNERLOGO.jpg')} />

          {
            !signupVisible ?

              <ViewAN style={styles.container2} animation="slideInUp" duration={800}>

                <Text style={styles.title2} animation="slideInUp" duration={600}>Login</Text>
                {/* <Text style={styles.subtitle} animation="slideInUp" duration={1100}>Enter Username </Text> */}
                <TextInput style={styles.textInput} placeholder="Phone.."
                  defaultValue={dataa.Phone}
                  onChangeText={(e) => setdata({ ...dataa, 'Phone': e })}
                />
                {/* <Text style={styles.subtitle} animation="slideInUp" duration={1100}>Enter Password </Text> */}
                <TextInput style={styles.textInput} placeholder="Password.."
                  defaultValue={dataa.Password}
                  onChangeText={(e) => setdata({ ...dataa, 'Password': e })}
                />

                <TouchableOpacity style={styles.button} onPress={() =>
                  Login()
                }><Text style={styles.buttonText}>
                    Sign in</Text>
                  {!loading ?
                    <AntDesign name="login" size={24} color="#fff" />
                    :
                    <ActivityIndicator size={30} color="#fff" />
                  }

                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() =>
                  setsignupVisible(true)
                }><Text style={styles.buttonText}>Create Account</Text>
                  <MaterialCommunityIcons name="account-edit-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </ViewAN>
              : <SignUp setsignupVisible={setsignupVisible} />}
        </ImgBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '70%',
    height: '18%',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: -100,
    zIndex: 1,
    marginTop: 30,
  },
  checkbox: {
    alignSelf: 'center',
  },

  buttonText: {
    marginLeft: 15,
    color: '#fff',
    paddingVertical: 10
  },
  container2: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: "rgba(9, 9, 9, 0.2)",
    borderRadius: 20,
    padding: 30,
    paddingTop: 100,
    justifyContent: 'flex-start'

  }
  ,
  textInput: {
    fontSize: 18,
    marginVertical: 8,
    // border: ["aliceblue", "0px solid black"],
    borderBottomWidth: 1,
  },
  main: {
    flex: 1,
    // maxWidth: 960,
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-start'
    // marginHorizontal: "auto",

  },
  title: {
    alignSelf: 'center',
    paddingBottom: 30,
    fontSize: 64,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 50,
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
    display: 'flex',
    flexDirection: 'row-reverse',
    // width:200,
    backgroundColor: 'grey',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingRight: 15,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#000",
    alignItems: "center"
  }
});
