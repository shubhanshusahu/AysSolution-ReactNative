import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetReq } from '../apiCalls/api';
import { ActivityIndicator } from 'react-native';
import Agent from '../components/Agent';

export default function Referrals({ route }) {
    const { quer, access } = route.params;
    const [refferals, setrefferals] = useState([])
    const fetchMyReferrals = async () => {
        let d
        console.warn(quer,'quer')
        d = await GetReq(`/getreffered?quer=${quer}`)
        setrefferals(d.data)
        console.warn('referrals', d)
    }
    useEffect(() => {
        fetchMyReferrals()
    }, [])

    return (
        <ScrollView>
        {refferals.length == 0 ?<View style={[styles.container, styles.horizontal]}>
        <Text>No data found</Text>
  
          </View> : refferals.map((item,i) => {
          return  <Agent key ={i} data ={item}/>
        })  }
      </ScrollView>
    )
}

const styles = StyleSheet.create({
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
})