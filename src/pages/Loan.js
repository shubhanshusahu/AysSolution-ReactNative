import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import {Loandata} from '../data'
import Card from '../components/Card'
import ImgBackground from '../components/ImgBackground'
import Banners from '../components/Banners'

const Policy = () => {
    const data =Loandata
  return (
    <View style={styles.main}>
       <ImgBackground imguri  = "https://papers.co/wallpaper/papers.co-so32-blur-gradation-blue-purple-41-iphone-wallpaper.jpg">
       <Banners data = {Loandata}/>
    {/* <FlatList
    fadingEdgeLength={100}
    data={data}
    style = {{height:"100%"}}
    numColumns={2}
    keyExtractor={({ id }) => id.toString()}
    renderItem={({ item }) => <Card title ={item.title} img = {item.img}/>}
/> */}
<View style ={styles.customflatlist}>
{
    Loandata.map((item,i)=> <React.Fragment key={i}><Card title ={item.title} img = {item.img} id ={item.id}/></React.Fragment>)
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
      maxWidth: 960,
      marginHorizontal: "auto",
      width: "100%",
      height:"100%",
    },
    customflatlist:{
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap'
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
  