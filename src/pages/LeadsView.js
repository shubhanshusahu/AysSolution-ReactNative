import { StyleSheet, ScrollView, ActivityIndicator, RefreshControl, FlatList, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetReq } from '../apiCalls/api'
import Lead from '../components/Lead'
import { useDispatch, useSelector } from 'react-redux'
import CalendarPicker from 'react-native-calendar-picker'
import Button from '../components/Elements/Button'
import { lightTheme, statuses } from '../data'
import SelectDropdown from 'react-native-select-dropdown'
// import { AntDesign, Ionicons } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { View, Text, Image } from "react-native-animatable";

const LeadsView = ({ route }) => {
  const [data, setdata] = useState([])
  const {user} = useSelector(state => state.reducer)
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [calvisible, setcalvisible] = useState(false)
  const [date, setdate] = useState(null)
  const [totalPages, settotalPages] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [newdata, setnewdata] = useState(data)
  const [loading, setloading] = useState(false)
  const [showSearchbox, setshowSearchbox] = useState(false)
  const [hidLoadmore, sethidLoadmore] = useState(false)
  const inputRef = React.useRef(null)
  const [searchVal, setsearchVal] = useState('')
  const [nodata, setnodata] = useState(false)
  const onRefresh = React.useCallback(() => {
    sethidLoadmore(false)
    setRefreshing(true);
    setdata([])
    setCurrentPage(1)
    fetching()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  let d = []
  const { quer, access } = route.params;
  // alert(quer)
  async function fetching(dat = null) {
    let mainquery = '/leads?page=' + currentPage + '&limit=10'
    let dashboardquery =`/leadsbydashboard?quer=${quer}`

    if(quer === null || quer ==='/' ){
      if(access == 'admin')
       d = await GetReq(mainquery)
      else
      {
        let agentquery =`/leadsbydashboard?quer=AgentId =${user.Phone}`;
        d =await GetReq(agentquery)
         sethidLoadmore(true)
      }
      
    }
    else
      { 
        d = await GetReq(dashboardquery)
        sethidLoadmore(true)
      } 

      checkNodata(Array.isArray(d.arr) ? d.arr : Array.isArray(d)? d:Array.isArray(d.data.arr)? d.data.arr : [])
    if (refreshing) {
      setdata(d.arr)
      setCurrentPage(1)
    }
    else {
      setdata([...data, ...d.data.arr])
    }

    setnewdata([...d.data.arr])
    if(d){
         dispatch({
      type: 'leads',
      data: d.data.arr
    }) 
    }

    settotalPages(d.data.totalPage)
    setloading(false)
  }
  useEffect(() => {
    if (newdata != []) {
      fetching()
    }

  }, [currentPage])

  const LoadMoreItem = () => {
    setloading(true)
    if (newdata != []) {
      setCurrentPage(currentPage + 1);
    }
  }
  const selectDate = async (dat) => {
    setnodata(false)
    sethidLoadmore(true)
    console.warn(dat)
    let dat1 = dat.year() + '-' + (dat.month() + 1) + '-' + dat.date()
    console.warn(dat1)
    let datevar = new Date(dat)
    d = await GetReq(`/leadsbydate?dat=${dat1}`)
    checkNodata({arr:d.data})
    console.warn({arr:d.data})
    setdata(d.data)
  }
  const checkNodata=(d)=>{
    if(d.length==0){
      setnodata(true)
    }
    else
    setnodata(false)
  }
  const searcsearchByStatus = async (status) => {
    setnodata(false)
    console.warn(status)
    sethidLoadmore(true)
    d = await GetReq(`/leadsbystatus?status=${status}`)
    console.warn('Status res',d)
    checkNodata(d)
    setdata(d.data)
  }

  const renderLoader = () => {
    return (
      <View style={styles.Loader}>
        {loading && <ActivityIndicator size={50} color={lightTheme.lightGrey} />}
        {
          newdata.length != 0 && !refreshing && !loading && !hidLoadmore ? <Button text="Load more" color={lightTheme.lightGrey} action={() => LoadMoreItem()} width={100} /> : ''
        }

      </View>
    )
  }
  const Search = async (txt) => {
    setnodata(false)
    console.warn(txt)
    sethidLoadmore(true)
    d = await GetReq(`/leadsbytext?text=${txt}`)
    console.warn(d)
    if (d.length == 0)
      setnodata(true)
    setdata(d)

  }
  return (
    <>{
      access =='admin' &&
      <View animation="slideInUp" duration={800} style={styles.row}>
        {/* <Button text={calvisible ? 'Close calendar' : "Pick by Date"} color={calvisible ? lightTheme.close : lightTheme.lightGrey}
          txtcolor={lightTheme.Secondary}
          action={() => setcalvisible(!calvisible)} mwidth={150}>
          <AntDesign name="down" size={18} color="black" />
        </Button> */}
        {/* <SelectDropdown
          data={statuses}
          onSelect={(selectedItem, index) => {
            searcsearchByStatus(selectedItem)
          }}
          rowTextStyle={{ fontSize: 15 }}
          buttonTextStyle={styles.button}
          // defaultValue='Search by status'
          defaultButtonText='Search by status'
          // defaultValue={props.lead.Status}
          buttonStyle={styles.dropdown}
          // style ={styles.dropdown}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        /> */}
        {/* <TouchableOpacity onPress={() => {
          setshowSearchbox(!showSearchbox)
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
          inputRef.current?.focus();
        }}>
          <Ionicons name={!showSearchbox ? "search-circle" : 'close-circle-sharp'} size={48} color={lightTheme.lightGrey} />
          </TouchableOpacity> */}
      </View>
}
      {showSearchbox &&
        <View
          animation="lightSpeedIn" duration={800}
          style={styles.row}>
          <TextInput ref={inputRef} style={styles.textInput} placeholder='Name/ Address/ Phone/ ID'
            defaultValue={searchVal} onChangeText={e => setsearchVal(e)} onSubmitEditing={() => Search(searchVal)} />
          <Ionicons name="search-circle" size={48} color={lightTheme.lightGrey} onPress={() => Search(searchVal)} />
        </View>}
      {calvisible ? <CalendarPicker
        onDateChange={(d) => selectDate(d)}
      /> : ''}
      {access == 'agentlistinadmin'? <Text style={styles.subtitle}>Agent lead count: {data.length}</Text>:''}
      {!data || !data.length || data.length == 0  ? <View style={[styles.container, styles.horizontal]}>
        {!nodata ? <ActivityIndicator size={50} color={lightTheme.lightGrey} /> :
         <Text>No data found</Text>
          } 
      </View> :
        <FlatList
          data={data}
          renderItem={({ item }) => <Lead key={item} data={item} fetching={fetching}  access ={access}/>}
          keyExtractor={item => item.LeadId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={renderLoader}
          fadingEdgeLength={50}
        // onEndReached={LoadMoreItem}
        // onEndReachedThreshold={0.5}
        // onEndReached={({ distanceFromEnd }) => {
        // if(distanceFromEnd >= 0) {
        //   LoadMoreItem()
        // }
        // }}
        />
      }
      {/* <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >

      
      {data==undefined?<View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={50} color="#0000ff" />

        </View> : data.map((item,i) => {
        return  <Lead key ={i} data ={item} fetching= {fetching}/>
      })  }
    </ScrollView> */}
    </>
  )
}

export default LeadsView



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
  textInput: {
    fontSize: 18,
    marginVertical: 8,
    backgroundColor: lightTheme.lightGrey,
    marginLeft: 20,
    width: '70%',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    // border: ["aliceblue", "0px solid black"],
    borderBottomWidth: 1,
  },
  customflatlist: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  flatlist: {
    // flex:1,
    // flexDirection:'row',
    // height:'30%',
    overflow: "scroll",
    display: 'flex',
    maxHeight: 400
  },
  dropdown: {
    width: 180
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 13,
    // margin:3,
    // height:40,
    padding: 10,
    // paddingHorizontal:10,
    backgroundColor: lightTheme.lightGrey,
    borderRadius: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    paddingHorizontal:15,
    fontSize: 25,
    color: "#38434D",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor:'blue',
    // height:300
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
  },
  Loader: {
    marginVertical: 10,
    alignItems: 'center'
  },
});
