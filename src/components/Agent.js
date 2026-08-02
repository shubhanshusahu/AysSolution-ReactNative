import { Text, StyleSheet, Image, Alert,Modal,Pressable} from 'react-native'
import React from 'react'
import { View } from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import { Feather } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector, } from 'react-redux'
import { lightTheme } from '../data'
import { useNavigation } from '@react-navigation/native'

const Agent = (props) => {
  const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [selAgent, setselAgent] = useState({})
    const dispatch = useDispatch()
  const {user} = useSelector(state => state.reducer)

    const nav=()=>{
      navigation.navigate('leadview', { quer: 'AgentId ='+props.data.Phone ,access : 'agentlistinadmin'})
    }
    const navforReferal=()=>{
      navigation.navigate('referrals', { quer: `Referedby ='${props.data.ReferCode}'` ,access : 'agentreferrals'})
    }
    const selectedAgent = (Agent)=>{

        setModalVisible(true)
        // dispatch({
        //     type: 'AgentOff',
        //     data: data
        //   })
        //   setselAgent(Agent)
    }
    return (
        <View animation="slideInUp" Easing='ease' duration={700}> 
        <View style={styles.main}  onPress={() => selectedAgent(props.data)}>
            <Image style={styles.img} source={require('../../assets/user.png')} />
            <TouchableOpacity style ={styles.container2}>
            <View style={styles.box} >
                <Text style={styles.name}>{props.data.Name}</Text>
                <Text>Contact : {props.data.Phone}</Text>
                <Text>Wallet : ₹{props.data.Wallet || 0}</Text>
                <Text>Location : ₹{props.data.Address || ''}</Text>

            </View></TouchableOpacity>

            {/* refered */}
            {
            user.Role != 'Agent' &&
            <>
            <TouchableOpacity onPress={()=>navforReferal()} >
            <View style={styles.box2}>
            <Feather name="user-plus" size={25} color={lightTheme.Secondary} />
            <Text>Referrals</Text>
            </View>
            </TouchableOpacity>

            


            <TouchableOpacity onPress={()=>nav()} >
            <View style={styles.box2}>
            <FontAwesome name="list-alt"  size={25} color={lightTheme.Secondary} />
            <Text>Leads</Text>
            </View>
            </TouchableOpacity>
            </>
}
            {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <AgentPopup setModalVisible ={setModalVisible} Agent ={props.data}/>

          </View>
        </View>
      </Modal> */}
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
            {/* <Image style={styles.img} source={require('../../assets/call.png')} onPress = {()=>alert('pressed')} /> */}
        </View></View>
    )
}

export default Agent


const styles = StyleSheet.create({

    main: {
        // height: 40,

        display: 'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection: 'row',
        margin: 7,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'lightgrey'
    }
    ,
    container2:{
        width:'55%',
        // backgroundColor:'red',
        // textAlign:'left'
    },

    box: {
        // backgroundColor:'blue',
        width: 'auto',
        // alignItems:'center',
        marginLeft: 10,
        // backgroundColor:'red'
    },
    box2: {
      // backgroundColor:'blue',
      width: 'auto',
      alignItems:'center',
      marginLeft: 10,
      // backgroundColor:'red'
  },
    name: {
        fontSize: 18,
    }
    , img: {
        width: 50,
        height: 50,
        // alignSelf: 'center',
        // borderRadius: 100,
        // marginBottom: -100,
        // zIndex: 1,

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