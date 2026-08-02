import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native-animatable'
import data, { Loandata, lightTheme, statuses } from '../data'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Linking } from 'react-native'
import { Platform } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Button from './Elements/Button'
import { GetReq, PutReq } from '../apiCalls/api'
import { createThreeButtonAlert } from './Elements/Alert'
import { useSelector } from 'react-redux'

const LeadPopup = (props) => {

  const [plan, setplan] = useState(null)
  const [selectedStatus, setselectedStatus] = useState('')
  const [AgentUPI, setAgentUPI] = useState('')
  let p = null
  const {ads} = useSelector(state => state.reducer)
  let d = [...data, ...Loandata, ...ads]

  const updateStatus = () => {
    if (selectedStatus == 'Converted' && props.lead.AgentId != "Anonymous") {
      createThreeButtonAlert("Agent Payment done?", () => PutReq('/leads', { 'Status': selectedStatus, 'LeadId': props.lead.LeadId, }, 'Status Updated'));
    }
    else
      PutReq('/leads', { 'Status': selectedStatus, 'LeadId': props.lead.LeadId, }, 'Status Updated')
  }
  const UPIURL = `upi://pay?pa=${AgentUPI?.UPIid}&pn=Shubhanshu%20Sahu&mc=0000&mode=02&am=1&tn=testing&purpose=00`;
  const upiOpener = async () => {
    Linking.openURL(UPIURL)
  }
  const opensms = (num) => {
    let msg = "Hi, Arvind here\n I want to share some Policy details with you, \n please let me know when can we have a chat."
    const separator = Platform.OS === 'ios' ? '&' : '?'
    const url = `sms:${num}${separator}body=${msg}`
    Linking.openURL(url)
  }

  const openWhatsapp = (num) => {
    let url = "whatsapp://send?text=" +
      'Hi, Arvind here\n I want to share some Policy details with you, \n please let me know when can we have a chat.' +
      "&phone=91" +
      num;
    Linking.openURL(url)
  }
  useEffect(() => {

    console.warn(d)
    p = d.filter(item => item.id == props.lead.PlanId)
    setplan(p)
    getUPI()
  }, [])
  const getUPI = async () => {
    let temp = await GetReq('/upiid?phone=' + props.lead.AgentId)
    setAgentUPI(temp.data[0])
    console.warn(temp.data[0], 'temp')
  }
  return (
    <View style={styles.main}>
      <Text style={styles.nam}>{props.lead.ApplicantName}</Text>
      <Text style={styles.textStyle}> Policy/Loan/Property: {plan !== null ? plan[0]?.title || props.lead.ApplicantName : 'loading...'}</Text>

      <Text style={styles.textStyle}>Contact: {props.lead.APhone}</Text>
      <Text style={styles.textStyle}>Location: {props.lead.ALocation}</Text>

      <Text style={styles.textStyle}>Agent Contact: {props.lead.AgentId}</Text>
      {
        props.access == 'admin' &&
        <>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => {
              let number = '';
              if (Platform.OS === 'ios') {
                number = 'telprompt:${' + props.lead.APhone + '}';
              }
              else {
                number = 'tel:${' + props.lead.APhone + '}';
              }
              Linking.openURL(number);
            }}><Image
                animation="bounceInDown" Easing='easeIn' duration={1200}
                style={styles.img} source={require('../../assets/call.png')} onPress={() => alert('pressed')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => opensms(props.lead.APhone)}>
              <Image
                animation="bounceInDown" Easing='easeIn' duration={1500}
                style={styles.img} source={require('../../assets/sms.png')} onPress={() => alert('pressed')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openWhatsapp(props.lead.APhone)}>
              <Image
                animation="bounceInDown" Easing='easeIn' duration={1800}
                style={styles.img} source={require('../../assets/whatsapp.png')} onPress={() => alert('pressed')} />
            </TouchableOpacity>
          </View>

          <SelectDropdown
            data={statuses}
            onSelect={(selectedItem, index) => {
              setselectedStatus(selectedItem)
            }}
            defaultValue={props.lead.Status}
            buttonStyle={styles.dropdown}
            // style ={styles.dropdown}
            buttonTextAfterSelection={(selectedItem, index) => {

              if (selectedItem == 'Converted' && props.lead.AgentId != "Anonymous") {
                upiOpener();
              }

              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
        </>}
      {selectedStatus != '' ? <Button text="Update Status" color={lightTheme.success} txtcolor={lightTheme.Secondary}
        action={() => updateStatus()}
      />
        : ''}
      <Button text="Close" color={lightTheme.close} action={() => props.setModalVisible(false)} />

      {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable> */}
    </View>
  )
}

export default LeadPopup


const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    width: 200
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  nam: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    padding: 5,
  },
  img: {
    width: 50,
    height: 50,
    margin: 10,
  },
  dropdown: {
    marginBottom: 7,
    alignSelf: 'center',
    borderRadius: 20,
    height: 40,
  }
})