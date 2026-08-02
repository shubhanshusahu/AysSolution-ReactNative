import { Text, StyleSheet, Image, Alert,Modal,Pressable} from 'react-native'
import React from 'react'
import { View } from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import LeadPopup from './LeadPopup'
import { useDispatch } from 'react-redux'
import { lightTheme, statusColor } from '../data'

const Lead = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selLead, setselLead] = useState({})
    const dispatch = useDispatch()
    // let datevar = dat.date() +'-'+(dat.month()+1)+'-'+dat.year()
    const selectedLead = (lead)=>{
        setModalVisible(true)
        // dispatch({
        //     type: 'LeadOff',
        //     data: data
        //   })
        //   setselLead(lead)
    }
    
    return (
      <View animation="slideInUp" Easing='ease' duration={700}> 
        <TouchableOpacity style={{...styles.main,backgroundColor:statusColor[props.data.Status]}}  onPress={() => selectedLead(props.data)}>
            <Image style={styles.img} source={require('../../assets/user.png')} />
            <View style={styles.box}>
                <Text style={styles.name}>{props.data.ApplicantName}</Text>
                <Text>Date : {props.data.CreatedDate.substr(0, 10)}</Text>
                <Text>Lead no. : {props.data.LeadId}</Text>
            </View>
            <View style={styles.box2}>
            {/* <Text>Status</Text> */}
            <Text style={styles.txt}>{props.data.Status}</Text>
            

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
          <LeadPopup setModalVisible ={setModalVisible} lead ={props.data} access={props.access}/>

          </View>
        </View>
      </Modal>

        </TouchableOpacity>
        </View>
    )
}

export default Lead


const styles = StyleSheet.create({

    main: {

        display: 'flex',
        flexDirection: 'row',
        margin: 7,
        padding: 10,
        borderRadius: 20,
        backgroundColor: lightTheme.lightGrey
    }
    ,
    box: {

        width: '60%',
        marginLeft: 10
    },
    box2: {

      display :'flex',
      alignItems:'center',
      justifyContent:'center',
      minWidth: '15%',

      marginLeft: 5,
  },
    name: {
        fontSize: 20,
    },
    txt:{
      textAlign: 'right',
      alignSelf:'flex-end',
      flexWrap:'wrap',
      textAlign:'center',
      maxWidth :80
    }
    , img: {
        width: 50,
        height: 50,


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
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
}
)