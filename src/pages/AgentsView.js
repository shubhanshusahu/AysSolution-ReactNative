import { View, Text ,StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetReq } from '../apiCalls/api'
import Agent from '../components/Agent'

const AgentView = () => {
const [data, setdata] = useState(null)
let d =[]
useEffect(() => {
  async function fetching(){
      d =await GetReq('/agents')
      setdata(d.data)
  }
fetching()
}, [])


  return (
    <ScrollView>
      {data==null?<View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={50} color="#0000ff" />

        </View> : data.map((item,i) => {
        return  <Agent key ={i} data ={item}/>
      })  }
    </ScrollView>
  )
}

export default AgentView



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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
      // backgroundColor:'blue',
      // height:300
    },
    horizontal: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  