import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../pages/Login';
import TabViewExample from '../../pages/Home';
import LeadGenerate from '../../pages/LeadGenerate';
import LeadsView from '../../pages/LeadsView';
import AdminHome from '../../pages/AdminHome';
import AgentView from '../../pages/AgentsView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import { AntDesign } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';
import AgentProfile from '../../pages/AgentProfile';
import { useSelector } from 'react-redux';
import Referrals from '../../pages/Referrals';
import LandingPage from '../../pages/LandingPage';
import Refer from '../../pages/Refer';
import Master from '../../pages/Master/Master';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Masternew from '../../pages/Master/Masternew';

const Stack = createNativeStackNavigator();
function LogoTitle(props) {

  return (
    <View style={{ width: '75%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 'auto' }}>
      <Image
        style={{ width: 40, height: 40, borderRadius: 25, marginRight: 7 }}
        source={require('../../../assets/iconnew.png')}
      />
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.title}</Text>
        <Text style={{ fontSize: 10, justifyContent: 'center' }}>* Property * Finance * Insurance</Text>
      </View>

    </View>

  );
}
const Logout = () => {
  const navigation = useNavigation()
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user')
    navigation.navigate('landingpage')
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPressOut={handleLogout}
        style={{ alignSelf: 'baseline', alignItems: 'center', justifyContent: 'center' }}>
        <AntDesign name="logout" size={17} color="black" />
        <Text style={{ fontSize: 12 }}>Logout</Text>
      </TouchableOpacity>
    </React.Fragment>


  );
}
const Prof = () => {
  const navigation = useNavigation()
  return (
    <React.Fragment>
      <TouchableOpacity onPressOut={() => navigation.navigate('agentprofile')}
        style={{ alignSelf: 'baseline', alignItems: 'center', justifyContent: 'center' }}>
        <FontAwesome5 name="user-cog" size={17} color="black" />
        <Text style={{ fontSize: 12 }} >Profile</Text>
      </TouchableOpacity>
    </React.Fragment>


  );
}
const MyStack = () => {
  const { user } = useSelector(state => state.reducer)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="landingpage" component={LandingPage}
          options={{ headerTitle: (props) => <LogoTitle title="AYS Solutions" {...props} /> }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'AYS Solutions', animation: 'flip' }}
        />
        <Stack.Screen name="Home" component={TabViewExample}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <LogoTitle title="AYS Solution" />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Prof />
                  <Logout />
                </View>
              </View>
            )
          }}
        />
        <Stack.Screen name="Lead" component={LeadGenerate}
          options={{ headerTitle: (props) => <LogoTitle title="Form" {...props} /> }}
        />
        <Stack.Screen name="leadview" component={LeadsView}
          options={{ headerTitle: (props) => <LogoTitle title="Leads" {...props} /> }}
        />
        <Stack.Screen name="referrals" component={Referrals}
          options={{ headerTitle: (props) => <LogoTitle title="Referrals" {...props} /> }}
        />
        <Stack.Screen name="admindashboard" component={AdminHome}
          options={{ headerTitle: (props) => <View style={{ flexDirection : 'row'}}><LogoTitle title="Dashboard" {...props} /><Logout /></View> }}
        />
        <Stack.Screen name="agentview" component={AgentView}
          options={{ headerTitle: (props) => <LogoTitle title="All Partners" {...props} /> }}
        />
        <Stack.Screen name="agentprofile" component={AgentProfile}
          options={{ headerTitle: (props) => <LogoTitle title={user.Name} {...props} /> }} />
        <Stack.Screen name="refer" component={Refer}
          options={{ headerTitle: (props) => <LogoTitle title='Refer to Earn'{...props} /> }} />
        <Stack.Screen name="master" component={Masternew}
          options={{ headerTitle: (props) => <LogoTitle title="Admin Master" {...props} /> }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack