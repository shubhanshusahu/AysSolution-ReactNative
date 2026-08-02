import React from 'react'
import { FlatList, ImageBackground, StyleSheet, } from 'react-native'
import data from '../data'
import Card from '../components/Card'
import ImgBackground from '../components/ImgBackground'
import Banners from '../components/Banners'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Image } from "react-native-animatable";

const Policy = ({ navigation }) => {


  const dispatch = useDispatch();
  const policydata = data
  // dispatch({
  //   type: 'LeadOff',
  //   data: data
  // })
  const {user} = useSelector(state => state.reducer)
  console.warn(user)
  return (
    <View style={styles.main}  animation="fadeInUp" duration={1000}>
      <ImgBackground imguri="https://e1.pxfuel.com/desktop-wallpaper/258/677/desktop-wallpaper-iphone7papers-blue-blur.jpg">
        <Banners data={policydata} />
        <View style={styles.customflatlist}>
          {
            policydata.map((item, i) => <React.Fragment key={i}><Card title={item.title} img={item.img} id={item.id} /></React.Fragment>)
          }
        </View>
      </ImgBackground>
    </View>
  )
}

export default Policy

const styles = StyleSheet.create({

  main: {
    flex: 1,
    justifyContent: "center",
    // maxWidth: 960,
    maxHeight: '100%',
    marginHorizontal: "auto",
    width: "100%",
    "backgroundImage": "url(\"paper.gif\")",
  },
  customflatlist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flatlist: {
    // flex:1,
    // flexDirection:'row',
    // height:'30%',
    overflow: "scroll",
    display: 'flex',
    maxHeight: 400
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
