import { Image, Modal, RefreshControl, StyleSheet, Text, TouchableOpacity, View, ViewBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import NumberCard from '../components/Elements/NumberCard'
import { ScrollView } from 'react-native'
import { GetReq } from '../apiCalls/api'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Wallet from '../components/Wallet'
import { Button } from 'react-native'
import { lightTheme } from '../data'
import Refer from './Refer'
// import { Image } from 'react-native-animatable'

const AgentProfile = () => {
  const [dashCard, setdashCard] = useState({
    t: 0,
    inp: 0,
    pend: 0,
    san: 0,
    conv: 0,
    clos: 0,
  })
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);

  let d = {}
  const [refreshing, setRefreshing] = React.useState(false);
  const { user } = useSelector(state => state.reducer)
  // console.log(user)
  let inp
  let t
  let pend
  let san
  let conv
  let clos

  const [refcount, setrefcount] = useState(null)
  const fetchMyReferralcount = async () => {
    let d
    // console.warn(quer,'quer')
    d = await GetReq(`/getrefferedcount?quer= Referedby ='${user.ReferCode}'`)
    setrefcount(d[0]?.refferals)
    console.warn('referralcount', d)
  }
  const fetching = async () => {

    inp = t = pend = san = conv = clos = 0;
    console.warn(user.Phone)
    d = await GetReq('/agentdashboard?agentPhone=' + user.Phone)
    d.data.forEach(e => {
      t = e.Total + t;
      e.Status == "In Progress" && (inp = inp + e.Total);
      (e.Status == "Not Reachable" || e.Status == "Call not picked" ||
        e.Status == "Applied") && (pend = pend + e.Total);
      e.Status == "Converted" && (conv = conv + e.Total);
      e.Status == "Sanctioned" && (san = san + e.Total);
      (e.Status == "Closed" || e.Status == "Property not approved" ||
        e.Status == "Profile not matched") && (clos = clos + e.Total);
    })
    return { inp, t, pend, san, conv, clos };
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    a();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  async function a() {
    console.warn(user)
    const tmp = await fetching();
    fetchMyReferralcount()
    setdashCard(tmp)
    console.warn(tmp)
    //   dispatch({
    //     type :'setDashboardAdmin',
    //     data :tmp
    // })
  }
  useEffect(() => {

    // if (user != null) {
    //   console.warn(user)
    //   setdashCard(user)
    // }
    // else
    a()

  }, [])

  const Im = () => {
    return (
      <View style={styles.img} onTouchEnd={() => setModalVisible(!modalVisible)}>
        <Image style={{ width: '100%', height: '100%', marginBottom: 250 }} source={require('../../assets/referbanner.jpg')} />
        {/* <Image style={{height:'100%'}} animation="zoomInDown" Easing='easeIn' duration={1500} source={require('../../assets/referbanner.jpg')} /> */}
      </View>)
  }
  const navigation = useNavigation()

  return (
    <ScrollView fadingEdgeLength={50}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', }}
    >
      {/* <TouchableOpacity style={styles.touch} > */}
      {/* <Image style={styles.img} animation="zoomInDown" Easing='easeIn' duration={1500} source={require('../../assets/referbanner.jpg')} /> */}



      {/* <Im/>  */}
      <View style={styles.Heading}>
        <Text style={styles.HeadingText}>Dashboard</Text>
      </View>

      {/* </TouchableOpacity> */}
      {/* removed wallet for solving playstore issue (temporarilys) */}
      {/* <Wallet /> */}
      <NumberCard title="Total Leads" num={dashCard.t} query={'/'} access="agent" />
      <NumberCard title="In Progress Leads" num={dashCard.inp} query={'Status = "In Progress" and AgentId =' + user.Phone} access="agent" />
      <NumberCard title="Pending Leads" num={dashCard.pend}
        query={'(Status = "Not Reachable" or Status = "Call not picked" or Status = "Applied") and AgentId = ' + user.Phone} access="agent" />
      <NumberCard title="Sanction Leads" num={dashCard.san} query={'Status = "Sanctioned" and AgentId = ' + user.Phone} access="agent" />
      <NumberCard title="Converted Leads" num={dashCard.conv} query={'Status = "Converted" and AgentId = ' + user.Phone} access="agent" />
      <NumberCard title="Closed Leads" num={dashCard.clos}
        query={'(Status = "Closed" or Status = "Profile not matched" or Status = "Property not approved" ) and AgentId = ' + user.Phone}
        access="agent" />
      <NumberCard title="My Referrals" num={refcount} query={user.ReferCode} access="agentRefferal" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Refer setModalVisible={setModalVisible} ReferCode={user.ReferCode} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default AgentProfile

const styles = StyleSheet.create({
  img: {
    width: '100%',
    padding: 5,
    height: '22%',

  },
  Heading: {
    width: '85%',
    marginBlock: 20
  },
  HeadingText: {
    fontSize: 25,
  },
  container: {
    maxHeight: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

})