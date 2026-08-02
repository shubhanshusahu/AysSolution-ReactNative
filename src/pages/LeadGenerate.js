import { StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Image } from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import ImgBackground from '../components/ImgBackground';
import axios from 'axios'
import { BaseUrl, LoanInfo, PolicyInfo, adNote, lightTheme } from '../data';
import { PostReq } from '../apiCalls/api';
import moment from 'moment';
import Button from '../components/Elements/Button';
const LeadGenerate = ({ route }) => {

  const navigation = useNavigation();
  const { userroute, dataroute } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const selectedLead = navigation.getState().routes.filter(item => item.name === 'Lead')
  const { user } = useSelector(state => state.reducer)
  // console.warn('user',user)
  const [data, setdata] = useState({
    PlanId: dataroute.id,    // selectedLead[0].params.data.id,
    AgentId: userroute == 'Anonymous' ? 'Anonymous' : user.Phone,
    ApplicantName: '',
    APhone: '',
    ALocation: '',
    CreatedDate: moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss')
  })
  useEffect(() => {

  }, [])


  const Submit = async () => {

    // axios.post('http://localhost:3002/leads',data,{headers :{ Accept: 'application/json'}})
    // .then(res=>{
    //   console.log(res)
    //   alert(JSON.stringify(res))
    // })
    // .catch(e=>{
    //   console.warn(e)
    // })
    if (data.ALocation != "" && data.APhone !== "" && data.ApplicantName != "") {
      await PostReq('/leads', data, 'Application Submitted!')
      navigation.pop()
    }

    else
      alert('Please enter the details!')

  }
  return (
    <View>
      <ImgBackground imguri={dataroute.img}>
        <View animation="slideInUp" duration={1000} style={styles.curve} >
          <Image
            style={styles.img}
            animation="fadeInDownBig" duration={800}
            source={{
              uri: dataroute.img,
            }}
          />
          <Text animation="zoomInDown" duration={900}
            style={styles.title}>{dataroute.title}
          </Text>
          <Text animation="slideInRight" duration={1000}
            style={styles.subtitle}>Application form
          </Text>
          <TextInput
            underlineColorAndroid='#f2f2f2'
            style={styles.input}
            placeholder='Name..'
            defaultValue={data.ApplicantName}
            onChangeText={(e) => setdata({ ...data, 'ApplicantName': e })}
          />
          <TextInput
            keyboardType='numeric'
            underlineColorAndroid='#f2f2f2'
            style={styles.input}
            placeholder='Phone..'
            defaultValue={data.APhone}
            onChangeText={(e) => setdata({ ...data, 'APhone': e })}
          />
          <TextInput
            underlineColorAndroid='#f2f2f2'
            style={styles.input}
            placeholder='Location..'
            defaultValue={data.ALocation}
            onChangeText={(e) => setdata({ ...data, 'ALocation': e })}
          />
          <Button text="Info" color={lightTheme.Secondary} action={() => setModalVisible(true)} />
          <Button text="Submit" color={lightTheme.success} action={() => Submit()} />
          <Button text="Back" color={lightTheme.close} action={() => (navigation.pop())} />

          {/*        
            <TouchableOpacity style={styles.button} onPress={()=>Submit()}>
              <Text  style ={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>(navigation.pop())}>
              <Text  style ={styles.buttonText}>Back</Text>
            </TouchableOpacity> */}
        </View>

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
              <Text style={styles.title}>Note</Text>
              <Text animation="fadeInRightBig" duration={1000}
                style={styles.info}
              >{ dataroute?.type ? adNote :  dataroute.id.includes('L') ? LoanInfo : PolicyInfo}
              </Text>
              <Button text="Close" color={lightTheme.close} action={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>

      </ImgBackground>
    </View>
  )
}

export default LeadGenerate


const styles = StyleSheet.create({
  curve: {
    display: "flex",
    border: "0px solid black",
    // width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: 'flex-start',
    margin: 20,
    // height:"100%",
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 12,
    textAlign: 'center',
    // justifyContent:'center'
  },
  img: {
    marginHorizontal: 10,
    borderRadius: 13,
    height: 100,
    maxHeight: 110,
    // marginTop: 210,
    // WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
  },
  info: {
    color: lightTheme.primary,
    paddingLeft: 10,
    // fontSize:15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'grey',
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
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,

    marginHorizontal: 10,
  },
  title: {
    // position: 'absolute', top: 84, left: "17%", right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
    color: '#dadada',
    alignSelf: 'center',
    fontWeight: "bold",
    fontSize: 30,
    marginHorizontal: 10,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 25,
    color: "#f2f2f2",
    marginHorizontal: 10,
    marginVertical: 20
  },
  fields: {
    fontSize: 20,
    marginLeft: 10
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 20,
    height: 30,
    color: "#f2f2f2",
    alignSelf: 'center',
    paddingBottom: 10,
    width: "90%",
    margin: 10
  },
  buttonText: {
    color: '#fff',
    paddingVertical: 10
  },
  button: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: "#000",
    alignItems: "center"
  },
})