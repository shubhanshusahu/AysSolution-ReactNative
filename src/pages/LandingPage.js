import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ImgBackground from '../components/ImgBackground'
import { Image } from 'react-native-animatable'
import Banners from '../components/Banners'
import { useNavigation } from '@react-navigation/native'
// import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import data, { Loandata } from '../data'
import { useDispatch } from 'react-redux'
import { GetReq } from '../apiCalls/api'

export default function LandingPage() {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [advertisement, setAdvertisement] = useState([])
  const handleLogin = async () => {
    let user = await AsyncStorage.getItem("user")
      .then(user => {
        // console.log(user, 'user stored!!')
        if (user !== null) {
          // console.log('inside if')
          if (JSON.parse(user).Role === 'Admin')
            navigation.navigate('admindashboard', { name: 'Jane' })
          else
            navigation.navigate('Home', { name: 'Jane' })

          dispatch({
            type: 'login',
            data: user
          })
        }
        else {
          // console.log('inside else')
          navigation.navigate('Login')
        }
      })

  }
  const openWhatsapp = (num) => {
    let url = "whatsapp://send?text=" +
      'Hi AYS Solutions!' +
      "&phone=91" +
      num;
    Linking.openURL(url)
  }
  const getAds = async () => {
    const ads = await GetReq('/getAds')
    let temp = ads.data.map(ad => { return { ...ad, "img": ad.imgs } })
    console.warn(temp)
    dispatch({
      type: 'saveAds',
      data: temp.map(ad => { return { id: ad.idmaster, title: ad.name, img: ad.img } })
    })
    setAdvertisement(temp)
  }
  useEffect(() => {
    getAds()
  }, [])

  return (
    <View>
      <ImgBackground imguri="https://e1.pxfuel.com/desktop-wallpaper/258/677/desktop-wallpaper-iphone7papers-blue-blur.jpg">
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
          <AntDesign name="login" size={24} color="#fff" />
        </TouchableOpacity>
        <ScrollView style={{ maxHeight: '90%' }} fadingEdgeLength={50}>

          {advertisement !== undefined && advertisement !== null && advertisement.map((ad, i) => {
            let data = ad.img.split(",").map((link, i) => { return { type: 'ad', id: ad.idmaster.toString(), title: ad.name, img: link } })
            return (<View key={i} style={{ marginBottom: 3, paddingBottom :4,
             borderBottomColor : '#372b2b5d', borderBottomWidth :1 }}>
              <Banners data={data} />
              <Text style={styles.AdvertiseHeading} key={i}> {ad.name}</Text>
              <Text style={styles.AdvertiseHeading2}>  {ad.pdesc}  Range : {ad.prange} </Text>
               {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
               <TouchableOpacity onPress={() => openWhatsapp(props.lead.APhone)}>
              <Image
                animation="bounceInDown" Easing='easeIn' duration={1800}
                style={styles.img} source={require('../../assets/whatsapp.png')} onPress={() => alert('pressed')} />
            </TouchableOpacity>
               </View> */}
            </View>
            )
          }

          )}
           <Banners data={data} />
          <Text style={styles.AdvertiseHeading}> Insurance Policies</Text>
          <Text style ={styles.AdvertiseHeading2} > •Kanyadan policy •Education Policy 
            •Pension Policy, Mediclaim Policy •Personal Accident policy
            •Critical illness Policy •Trem Policy</Text>
         
          
          <Banners data={Loandata} />
          <Text style={styles.AdvertiseHeading}> Loans</Text>
          <Text style ={styles.AdvertiseHeading2} >✓Home loan ✓Plot loan ✓Top up loan ✓Mortgage loan ✓Home loan transfer ✓Personal loan ✓Business loan ✓Commercial loan</Text>
        </ScrollView>
      </ImgBackground>



    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: 120,
    textAlign: 'center',
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: 'grey',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#000",
  },
  AdvertiseHeading: {
    marginLeft: 20,
    color: '#000',
    fontWeight: 'bold',
    paddingVertical: 10
  },
  img: {
    width: 25,
    height: 25,
    margin: 5,
  },
  AdvertiseHeading2: {
    marginLeft: 20,
    color: '#343434',
    paddingVertical: 10
  },
  buttonText: {
    marginLeft: 15,
    color: '#fff',
    paddingVertical: 10
  },
})