import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{ useEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import { TouchableOpacity , } from 'react-native';
import { lightTheme } from '../data';
import NumberCard from '../components/Elements/NumberCard';
import { GetReq } from '../apiCalls/api';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Elements/Button';
const AdminHome = () => {
  const [dashCard, setdashCard] = useState({
    t : 0,
    inp : 0,
    pend :0,
    san :0,
    conv : 0,
    clos: 0,
  })

const dispatch =useDispatch()
  let d ={} 
  const [refreshing, setRefreshing] = React.useState(false);
  const {dashboard} = useSelector(state => state.reducer)
      let inp 
    let t
    let pend
    let san
    let conv
    let clos


    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      a();
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, []);
  
  const fetching =async ()=>{

     inp=t=pend=san= conv= clos=0;
    d= await GetReq('/admindashboard')
     d.data.forEach(e =>{
         t = e.Total + t;
          e.Status == "In Progress" && (inp = inp +e.Total);
          (e.Status == "Not Reachable" || e.Status == "Call not picked" ||
           e.Status == "Applied") && (pend = pend +e.Total);
           e.Status == "Converted" && (conv = conv +e.Total);
           e.Status == "Sanctioned" && (san = san +e.Total);
           (e.Status == "Closed" || e.Status == "Property not approved" ||
           e.Status == "Profile not matched") && (clos = clos +e.Total);
      })
      return {inp,t,pend,san,conv,clos};
  }
  async function a(){
    const tmp = await fetching();
    setdashCard(tmp)
    dispatch({
      type :'setDashboardAdmin',
      data :tmp
})
}
  useEffect(() => {

    if (dashboard != null) {
      setdashCard(dashboard)
    }
    else{
      a()
    }
      
  }, [])
  
    const navigation = useNavigation()
  return (
    <ScrollView
    refreshControl={
      <RefreshControl  refreshing={refreshing} onRefresh={onRefresh} />}
     style= {styles.box} contentContainerStyle={{flex: 1,justifyContent:'center',flexDirection:'row',flexWrap:'wrap',}} >
      <TouchableOpacity style ={styles.tab} onPress={()=>navigation.navigate('leadview', {quer : "/",access: 'admin'})}>
        <MaterialCommunityIcons name="database-eye-outline" size={24} color={lightTheme.primary}/> 
        <Text style ={styles.tabText}> Show leads </Text>
      </TouchableOpacity>
      <TouchableOpacity style ={styles.tab} onPress={()=>navigation.navigate('agentview')}>
        <Feather name="users" size={24} color={lightTheme.primary} /> 
       <Text style ={styles.tabText}> Show Agents </Text>
      </TouchableOpacity>

      <Button text = "Advertisements" color={lightTheme.Secondary} mwidth={'90%'} action={()=>navigation.navigate('master')} >
      <MaterialCommunityIcons name="home-city-outline" size={24} color="white" />
      </Button>

      <NumberCard title ="Total Leads" num={dashCard.t} query ={'/'}/>
      <NumberCard title ="In Progress Leads" num={dashCard.inp} query ={'Status = "In Progress"'}/>
       <NumberCard title ="Pending Leads" num={dashCard.pend}
        query ={'Status = "Not Reachable" or Status = "Call not picked" or Status = "Applied"'}/>
       <NumberCard title ="Sanction Leads" num={dashCard.san}  query ={'Status = "Sanctioned"'} />
       <NumberCard title ="Converted Leads" num={dashCard.conv}  query ={'Status = "Converted"'}/>
       <NumberCard title ="Closed Leads" num={dashCard.clos}
          query ={'Status = "Closed" or Status = "Profile not matched" or Status = "Property not approved"'}
       />


    </ScrollView>
  )
}

export default AdminHome

const styles = StyleSheet.create({
    box:{
        minWidth: '100%',
        
    },
    tab:{
        display:'flex',
        flexDirection:'row',
        // justifyContent:'center',
        alignItems:'center',
        width:'46%',
        margin:7,
        marginBottom :20,
        // height:40,
        padding: 20,
        backgroundColor: lightTheme.Secondary,
        borderRadius:20,
    },
    tabText:{
        fontSize:18,
        color:'#fff'
    },

})